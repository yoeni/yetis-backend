export enum serviceEnums {
    userService,
    orderService,
    courierService
}

export enum userEnums {
    getAllUsers,
    getUsersByType,
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
    deleteUserByType,
    deleteUserByUsername
}
export enum orderEnums {
    createFakeOrders,
    createOrder,
    getAllOrders,
    getOrderById,
    getOrderByCourier,
    assignOrder,
    updateOrderStatus,
    deleteOrderById
}

export enum courierEnums {
    getAllCouriers,
    getCourierById,
    getCourierOrders,
    deleteCourierById
}
