export enum serviceEnums {
    userService,
    orderService
}

export enum userEnums {
    getAllUsers,
    getUserById,
    getUserByEmail,
    getUserByUsername,
    addUser,
    userForgotPassword,
    updateUserData,
    updateUserLocation,
    updatePasswordUserById,
    updatePasswordUserByToken,
    updatePasswordUserByEmail,
    updatePasswordUserByUsername,
    deleteUserById,
    deleteUserByEmail,
    deleteUserByUsername
}
export enum orderEnums {
    createOrder,
    getAllOrders,
    getOrderById,
    getOrderByCourier,
    assignOrder,
    updateOrderStatus,
    deleteOrderById
}
