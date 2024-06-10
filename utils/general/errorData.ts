const ERRORS = {
    GENERIC_INTERNAL_ERROR: {
        code: '001',
        message: 'Server error'
    },
    REQUEST_PARAMETER_MISSING: {
        code:'002',
        message: 'Request parameters missing'
    },
    DATABASE_ALREADY_EXISTS: {
        code:'003',
        message: 'Database already exists'
    },
    DATABASE_DOES_NOT_EXIST: {
        code:'004',
        message: 'Database does not exist'
    },
    APPOINTMENT_CREATION_ERROR: {
        code:'005',
        message: 'Error creating appointment'
    },
    SCHEDUELE_CREATION_ERROR: {
        code:'006',
        message: 'Error creating schedule'
    },
    TENANT_CREATION_ERROR: {
        code:'007',
        message: 'Error creating tenant'
    },
    LOCATION_CREATION_ERROR: {
        code:'008',
        message: 'Error creating location'
    },
    ADDRESS_CREATION_ERROR: {
        code:'009',
        message: 'Error creating address'
    },
    DATA_FETCH_ERROR: {
        code:'010',
        message: 'Error fetching data'
    },
    DATA_DELETE_ERROR: {
        code:'011',
        message: 'Error deleteing data'
    },
    VALIDATION_ERROR: {
        code: '012',
        message: 'Invalid payload'
    }

}

export default ERRORS