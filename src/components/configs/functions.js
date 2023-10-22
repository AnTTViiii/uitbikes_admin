import { Slide } from "@mui/material";
import axios from "axios";
import { forwardRef } from "react";

export const colors = {
    green: '#4CAF50',
    red: '#DB190C',
    purple: '#8624DB',
    white: '#fff',
    orange: '#FF9066'
}

export const invoiceStatus = [
    'Chờ xác nhận',
    "Đang giao",
    "Đã giao",
    "Đã hủy"
]

export const requestStatus = [
    'Chờ xác nhận',
    "Đang duyệt",
    "Từ chối"
]

export const dot3digits = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const getTypeName = (x) => {
    let type = '';
    switch (x) {
        case 1: type = 'Xe số'; break;
        case 2: type = 'Tay ga'; break;
        case 3: type = 'Xe PKL'; break;
        default: break;
    }
    return type;
};

export const getBrandName = (x) => {
    let brand = '';
    switch (x) {
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
    switch (status) {
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
    switch (status) {
        case 0: name = "Chờ xác nhận"; break;
        case 1: name = "Đã duyệt"; break;
        case 2: name = "Từ chối"; break;
        default: break;
    }
    return name;
}

export const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const typeData = [
    {
        id: 0,
        name: "Tất cả",
    },
    {
        id: 1,
        name: "Xe số",
    },
    {
        id: 2,
        name: "Xe tay ga",
    },
    {
        id: 3,
        name: "Xe phân khối lớn",
    },
];
export const getGender = (gender) => {
    return gender === 1 ? 'Nữ' : (gender === 0 ? 'Nam' : '/')
}

const processFileImage = async (e) => {
    var file = e.target.files[0];

    var POST_URL = "https://api.cloudinary.com/v1_1/ddtjntpxe/upload";
    processFile();
    var uniqueId;

    function processFile(e) {
        console.log("changed");
        uniqueId = "ddtjntpxe" + new Date().getTime();
        var size = file.size;
        var sliceSize = 10 * 1000000;
        var start = 0;

        setTimeout(loop, 500);

        function loop() {
            console.log("looping");
            var end = start + sliceSize;

            if (end > size) {
                end = size;
            }
            var s = file.slice(start, end);
            send(s, start, end - 1, size);
            if (end < size) {
                start += sliceSize;
                setTimeout(loop, 500);
            }
        }
    }

    async function send(piece, start, end, size) {
        // console.log("end", end);

        var formdata = new FormData();

        formdata.append("file", piece);
        formdata.append("cloud_name", "ddtjntpxe");
        formdata.append("upload_preset", "UIT-music-player");

        const headers = {
            Accept: "/",
            "Content-Type": "multipart/form-data",
        };
        headers["X-Unique-Upload-Id"] = uniqueId;
        headers["X-Requested-With"] = "XMLHttpRequest";
        headers["Content-Range"] = "bytes " + start + "-" + end + "/" + size;
        const requestConfig = {
            url: POST_URL,
            method: "POST",
            data: formdata,
            headers,
        };
        const response = await axios(requestConfig);
        if (response?.data?.asset_id) {
            //Here i am trying to print the output of the response after the video is posted in cloudinary
            console.log(response.data.url, "response");
            return response.data.url;
        }
    }
};