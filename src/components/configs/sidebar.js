import { GridViewRounded, Person2Rounded, Inventory2Rounded, LocalShippingRounded, RequestPageRounded, AdminPanelSettingsRounded, CategoryRounded, ForumRounded, RateReviewRounded } from "@mui/icons-material"

const sidebar = [
    {
        link: '/',
        section: 'home',
        icon: <GridViewRounded />,
        text: 'Thống kê'
    },
    {
        link: '/customers',
        section: 'customers',
        icon: <Person2Rounded />,
        text: 'Khách hàng'
    },
    {
        link: '/brands',
        section: 'brands',
        icon: <CategoryRounded />,
        text: 'Hãng xe'
    },
    {
        link: '/products',
        section: 'products',
        icon: <Inventory2Rounded />,
        text: 'Sản phẩm'
    },
    {
        link: '/orders',
        section: 'orders',
        icon: <LocalShippingRounded />,
        text: 'Đơn hàng'
    },
    {
        link: '/requests',
        section: 'requests',
        icon: <RequestPageRounded />,
        text: 'Yêu cầu'
    },
    {
        link: '/admin',
        section: 'admin',
        icon: <AdminPanelSettingsRounded />,
        text: 'Quản trị viên'
    },
    {
        link: '/chat',
        section: 'chat',
        icon: <ForumRounded />,
        text: 'Hộp thư'
    },
    {
        link: '/reviews',
        section: 'reviews',
        icon: <RateReviewRounded />,
        text: 'Đánh giá'
    }
]

export default sidebar
