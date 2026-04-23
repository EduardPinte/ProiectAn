import { sequelize, Order, OrderItem, Product, User } from '../models/index.js'

export const getOrders = async (_req, res) => {
  const orders = await Order.findAll({
    include: [
      { model: User, as: 'user', attributes: ['id', 'firstName', 'lastName', 'email'] },
      {
        model: OrderItem,
        as: 'items',
        include: [{ model: Product, as: 'product', attributes: ['id', 'name', 'price'] }]
      }
    ]
  })
  return res.json(orders)
}

export const getOrderById = async (req, res) => {
  const order = await Order.findByPk(req.params.id, {
    include: [
      { model: User, as: 'user', attributes: ['id', 'firstName', 'lastName', 'email'] },
      {
        model: OrderItem,
        as: 'items',
        include: [{ model: Product, as: 'product', attributes: ['id', 'name', 'price'] }]
      }
    ]
  })
  if (!order) return res.status(404).json({ message: 'Order not found' })
  return res.json(order)
}

export const createOrder = async (req, res) => {
  const { userId, items } = req.body
  if (!userId || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'userId and items are required' })
  }

  try {
    const createdOrder = await sequelize.transaction(async (transaction) => {
      const order = await Order.create(
        { userId, status: 'pending', totalAmount: 0 },
        { transaction }
      )

      let total = 0
      for (const entry of items) {
        const product = await Product.findByPk(entry.productId, { transaction, lock: true })
        if (!product) throw new Error(`Product ${entry.productId} not found`)
        if (product.stock < entry.quantity) {
          throw new Error(`Insufficient stock for product ${product.id}`)
        }

        await product.update({ stock: product.stock - entry.quantity }, { transaction })
        await OrderItem.create(
          {
            orderId: order.id,
            productId: product.id,
            quantity: entry.quantity,
            unitPrice: product.price
          },
          { transaction }
        )

        total += Number(product.price) * Number(entry.quantity)
      }

      await order.update({ totalAmount: total.toFixed(2) }, { transaction })
      return order
    })

    const orderWithItems = await Order.findByPk(createdOrder.id, {
      include: [{ model: OrderItem, as: 'items' }]
    })
    return res.status(201).json(orderWithItems)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

export const updateOrderStatus = async (req, res) => {
  const [updated] = await Order.update(
    { status: req.body.status },
    { where: { id: req.params.id } }
  )
  if (!updated) return res.status(404).json({ message: 'Order not found' })
  const order = await Order.findByPk(req.params.id)
  return res.json(order)
}

export const deleteOrder = async (req, res) => {
  const deleted = await Order.destroy({ where: { id: req.params.id } })
  if (!deleted) return res.status(404).json({ message: 'Order not found' })
  return res.status(204).send()
}
