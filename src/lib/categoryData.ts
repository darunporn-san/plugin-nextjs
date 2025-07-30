export interface Category {
  id: string
  name: string
  children?: Category[]
}

export const categoryData: Category[] = [
  {
    id: "all",
    name: "ทั้งหมด"
  },
  {
    id: "automotive",
    name: "สินค้ายานยนต์",
    children: [
      {
        id: "car-cleaning",
        name: "ผลิตภัณฑ์ทำความสะอาดรถ",
        children: [
          { id: "car-wash", name: "น้ำยาล้างรถ" },
          { id: "car-wax", name: "ขี้ผึ้งเคลือบรถ" },
          { id: "car-interior", name: "น้ำยาทำความสะอาดภายใน" }
        ]
      },
      {
        id: "wheels-tires",
        name: "ล้อแม็กและยาง",
        children: [
          { id: "alloy-wheels", name: "ล้อแม็ก" },
          { id: "tires", name: "ยางรถยนต์" },
          { id: "wheel-accessories", name: "อุปกรณ์เสริมล้อ" }
        ]
      },
      {
        id: "tracking-devices",
        name: "อุปกรณ์ติดตามรถ",
        children: [
          { id: "gps-tracker", name: "GPS ติดตามรถ" },
          { id: "alarm-system", name: "ระบบแจ้งเตือน" }
        ]
      },
      {
        id: "engine-care",
        name: "ผลิตภัณฑ์ดูแลเครื่องยนต์",
        children: [
          { id: "engine-oil", name: "น้ำมันเครื่อง" },
          { id: "engine-additive", name: "สารเติมแต่งเครื่องยนต์" }
        ]
      },
      {
        id: "car-decoration",
        name: "อุปกรณ์ดูแลตกแต่งรถ",
        children: [
          { id: "car", name: "รถยนต์" },
          { id: "motorcycle", name: "มอเตอร์ไซค์" }
        ]
      }
    ]
  },
  {
    id: "books",
    name: "หนังสือ",
    children: [
      { id: "fiction", name: "นิยาย" },
      { id: "non-fiction", name: "สารคดี" },
      { id: "textbook", name: "หนังสือเรียน" }
    ]
  },
  {
    id: "camera",
    name: "กล้องและอุปกรณ์เสริม",
    children: [
      { id: "digital-camera", name: "กล้องดิจิตอล" },
      { id: "lens", name: "เลนส์" },
      { id: "accessories", name: "อุปกรณ์เสริม" }
    ]
  },
  {
    id: "apparel",
    name: "เครื่องแต่งกาย",
    children: [
      { id: "men-clothing", name: "เสื้อผ้าผู้ชาย" },
      { id: "women-clothing", name: "เสื้อผ้าผู้หญิง" },
      { id: "kids-clothing", name: "เสื้อผ้าเด็ก" }
    ]
  },
  {
    id: "consumer-goods",
    name: "สินค้าอุปโภคบริโภค",
    children: [
      { id: "food", name: "อาหาร" },
      { id: "beverage", name: "เครื่องดื่ม" },
      { id: "personal-care", name: "สินค้าส่วนบุคคล" }
    ]
  },
  {
    id: "outdoor-garden",
    name: "อุปกรณ์ภายนอกและตกแต่งสวน",
    children: [
      { id: "garden-tools", name: "เครื่องมือทำสวน" },
      { id: "outdoor-furniture", name: "เฟอร์นิเจอร์กลางแจ้ง" }
    ]
  },
  {
    id: "industrial",
    name: "อุปกรณ์สำหรับโรงงาน",
    children: [
      { id: "machinery", name: "เครื่องจักร" },
      { id: "tools", name: "เครื่องมือ" }
    ]
  },
  {
    id: "furniture",
    name: "เฟอร์นิเจอร์",
    children: [
      { id: "living-room", name: "ห้องนั่งเล่น" },
      { id: "bedroom", name: "ห้องนอน" },
      { id: "kitchen", name: "ห้องครัว" }
    ]
  },
  {
    id: "gadgets",
    name: "แกดเจ็ต & อุปกรณ์สวมใส่",
    children: [
      { id: "smartphone", name: "สมาร์ทโฟน" },
      { id: "smartwatch", name: "นาฬิกาอัจฉริยะ" },
      { id: "headphones", name: "หูฟัง" }
    ]
  }
]

export interface Product {
  id: string
  name: string
  category?: string
  price?: number
}

export const productData: Product[] = [
  {
    id: "1",
    name: "น้ำยาล้างรถ Premium",
    category: "ผลิตภัณฑ์ทำความสะอาดรถ",
    price: 299
  },
  {
    id: "2",
    name: "ล้อแม็ก 18 นิ้ว",
    category: "ล้อแม็กและยาง",
    price: 15000
  },
  {
    id: "3",
    name: "GPS ติดตามรถ",
    category: "อุปกรณ์ติดตามรถ",
    price: 2500
  },
  {
    id: "4",
    name: "น้ำมันเครื่อง 5W-30",
    category: "ผลิตภัณฑ์ดูแลเครื่องยนต์",
    price: 450
  },
  {
    id: "5",
    name: "ขี้ผึ้งเคลือบรถ",
    category: "ผลิตภัณฑ์ทำความสะอาดรถ",
    price: 399
  },
  {
    id: "6",
    name: "ยางรถยนต์ Michelin",
    category: "ล้อแม็กและยาง",
    price: 3500
  },
  {
    id: "7",
    name: "ระบบแจ้งเตือนรถ",
    category: "อุปกรณ์ติดตามรถ",
    price: 1800
  },
  {
    id: "8",
    name: "สารเติมแต่งเครื่องยนต์",
    category: "ผลิตภัณฑ์ดูแลเครื่องยนต์",
    price: 199
  }
] 