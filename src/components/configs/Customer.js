const Customer = {
    customer_id: 1,
    name: 'An Vi',
    address: 'Viet Nam',
    phone: '0987654321',
    dob: '2002-01-01',
    register_date: '2023-09-27',
    balance: 100000000,
    gender: 1,
    id_number: '075320520856',
    account_id: 1
}

export default Customer;

export const Account = {
    username: 'Viii',
    customer_id: 1,
    password: '00000000',
    email: 'viii@gm.com',
    is_admin: 1,
    avatar: 'https://res.cloudinary.com/dpwehcnso/image/upload/v1692029918/chan_s_doodle_qmdft7.jpg'
}

export const ChargeRequest = [
    {
        id: 1,
        customer_id: 1,
        date: '2022-3-25',
        account_number: '0987654321',
        status: 1,
        money: 1000000000
    },
    {
        id: 2,
        customer_id: 1,
        date: '2023-9-14',
        account_number: '0987654321',
        status: 1,
        money: 50000000
    },
    {
        id: 2,
        customer_id: 1,
        date: '2023-11-25',
        account_number: '0987654321',
        status: 1,
        money: 35000000
    }
]

export const Invoice = [
    {
        invoice_id: 1,
        date: '2022-8-11',
        customer_id: 1,
        total: 31549999,
        status: 3,
        details: [
            {p_id: 1}
        ]
    },
    {
        invoice_id: 2,
        date: '2022-2-8',
        customer_id: 1,
        total: 130599000,
        status: 2,
        details: [
            {p_id: 3},
            {p_id: 4}
        ]
    },
    {
        invoice_id: 3,
        date: '2023-9-22',
        customer_id: 1,
        total: 64250000,
        status: 2,
        details: [
            {p_id: 2},
            {p_id: 5}
        ]
    },
    {
        invoice_id: 4,
        date: '2023-10-3',
        customer_id: 1,
        total: 34259000,
        status: 1,
        details: [
            {p_id: 7},
            {p_id: 5}
        ]
    },
    {
        invoice_id: 5,
        date: '2023-10-25',
        customer_id: 1,
        total: 32000000,
        status: 0,
        details: [
            {p_id: 2},
            {p_id: 4},
            {p_id: 8}
        ]
    }
]

const InvoiceVD = [
    {
        id: 1,
        date: '2022-8-11',
        customer_id: 1,
        total: 31549999,
        status: 3,
        details: [
            {
                p_id: 1,
                quantity: 1, //sl mua
                name: 'CB150R The Streetster',
                color: 'Đen',
                price: 105500000,
                image: 'https://drive.google.com/uc?export=view&id=1aaKn42E3w1adgUOUrZts9znaEZGwcmQt',
            }
        ]
    },
]