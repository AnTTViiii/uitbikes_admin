export const dot3digits = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const getTypeName = (x) => {
    let type = '';
    switch(x) {
        case 1: type = 'Xe số'; break;
        case 2: type = 'Tay ga'; break;
        case 3: type = 'Xe PKL'; break;
        default: break;
    }
    return type;
};

export const getBrandName = (x) => {
    let brand = '';
    switch(x) {
        case 1: brand = 'Honda'; break;
        case 2: brand = 'Suzuki'; break;
        case 3: brand = 'Yamaha'; break;
        case 4: brand = 'SYM'; break;
        default: break;
    }
    return brand;
};

export const getItemQuantity = (item) => {
    let qty = 0;
    item.map((i) => (qty += i.quantity));
    return qty;
}

export const getInvoiceStatusName = (status) => {
    let name = '';
    switch(status) {
        case 0: name = "Chờ xác nhận"; break;
        case 1: name = "Đang giao"; break;
        case 2: name = "Đã giao"; break;
        case 3: name = "Đã hủy"; break;
        default: break;
    }
    return name;
}

export const getChargeRequestStatusName = (status) => {
    let name = '';
    switch(status) {
        case 0: name = "Chờ xác nhận"; break;
        case 1: name = "Đã duyệt"; break;
        case 2: name = "Từ chối"; break;
        default: break;
    }
    return name;
}