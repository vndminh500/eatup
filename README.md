# EatUp — Ứng dụng đặt món ăn trực tuyến

Monorepo gồm **backend API**, **giao diện khách hàng** và **bảng quản trị** cho nền tảng đặt đồ ăn. Hỗ trợ giỏ hàng, đơn hàng, thanh toán VNPay, voucher, đánh giá, blog, khiếu nại và chat hỗ trợ (Google Gemini).

## Cấu trúc dự án

```
food-app/
├── backend/     # API Express + MongoDB
├── frontend/    # Web khách hàng (React + Vite)
├── admin/       # Trang quản trị (React + Vite)
├── docker-compose.yml
└── .env         # Biến môi trường dùng chung (không commit)
```

## Tính năng chính

| Phần | Mô tả |
|------|--------|
| **Khách hàng** | Xem thực đơn, giỏ hàng, đặt hàng, thanh toán VNPay, theo dõi đơn, yêu thích, hồ sơ, blog |
| **Quản trị** | Quản lý món ăn, đơn hàng, voucher, blog (Editor.js), khiếu nại |
| **Backend** | REST API, JWT, upload ảnh, reset tồn kho theo lịch, tích hợp VNPay & Gemini |

## Công nghệ

- **Backend:** Node.js, Express 5, MongoDB (Mongoose), JWT, Multer, VNPay, Google Generative AI
- **Frontend / Admin:** React 19, Vite 7, React Router, Axios
- **Triển khai:** Docker, Nginx (cho bản build production)

## Yêu cầu

- [Node.js](https://nodejs.org/) 18+ (khuyến nghị LTS)
- MongoDB (local hoặc [MongoDB Atlas](https://www.mongodb.com/atlas))
- Tài khoản [VNPay Sandbox](https://sandbox.vnpayment.vn/) (nếu test thanh toán)
- [Google AI Studio](https://aistudio.google.com/) — API key cho chat (tùy chọn)

## Cấu hình môi trường

1. Tạo file `.env` tại thư mục gốc (tham khảo `backend/.env.example`):

```env
JWT_SECRET="your_random_secret"
MONGO_URI="mongodb://127.0.0.1:27017/food-app"
ADMIN_EMAILS="admin@example.com"
ADMIN_PASSWORD="YourSecurePassword123"
ADMIN_NAME="Admin"
VNP_TMNCODE="your_vnpay_tmn_code"
VNP_HASHSECRET="your_vnpay_hash_secret"
VNP_URL="https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"
VNPAY_TEST_MODE="true"
GEMINI_API_KEY="your_google_ai_studio_key"
```

2. **Frontend** và **Admin** — tạo `.env` trong từng thư mục:

```env
VITE_BACKEND_URL=http://localhost:4000
```

> Không commit file `.env` (đã được liệt kê trong `.gitignore`).

## Chạy local (development)

Mở ba terminal (hoặc chạy song song):

### Backend (cổng 4000)

```bash
cd backend
npm install
npm run server
```

### Frontend khách hàng (cổng 5173 — mặc định Vite)

```bash
cd frontend
npm install
npm run dev
```

### Admin (cổng 5174 nếu chỉ định trong `vite.config`, hoặc cổng Vite mặc định)

```bash
cd admin
npm install
npm run dev
```

| Dịch vụ | URL mặc định |
|---------|----------------|
| API | http://localhost:4000 |
| Khách hàng | http://localhost:5173 |
| Quản trị | http://localhost:5174 (khi chạy `dev` với port riêng) |

API gốc trả về: `GET /` → `Kết nối API`.

## Chạy bằng Docker

Từ thư mục gốc, đảm bảo đã có file `.env`:

```bash
docker compose up --build
```

| Container | Cổng host |
|-----------|-----------|
| Backend | 4000 |
| Frontend | 5173 → 80 |
| Admin | 5174 → 80 |

## API (tóm tắt)

| Prefix | Mô tả |
|--------|--------|
| `/api/food` | Món ăn, danh mục |
| `/api/user` | Đăng ký, đăng nhập, tài khoản |
| `/api/cart` | Giỏ hàng |
| `/api/order` | Đơn hàng, VNPay |
| `/api/voucher` | Mã giảm giá |
| `/api/comment` | Bình luận |
| `/api/review` | Đánh giá |
| `/api/complaint` | Khiếu nại / hoàn tiền |
| `/api/chat` | Chat hỗ trợ (Gemini) |
| `/api/blog` | Bài viết blog |
| `/images` | Ảnh tĩnh từ `backend/uploads` |

## Scripts hữu ích

| Thư mục | Lệnh | Mô tả |
|---------|------|--------|
| `backend` | `npm run server` | Chạy API với nodemon |
| `frontend` | `npm run dev` | Dev server Vite |
| `frontend` | `npm run build` | Build production |
| `admin` | `npm run dev` | Dev server admin |
| `admin` | `npm run build` | Build admin |

## Ghi chú bảo mật

- Đổi `JWT_SECRET`, mật khẩu admin và khóa VNPay trước khi đưa lên production.
- Dùng `VNPAY_TEST_MODE=false` và endpoint production khi go-live.
- Không đẩy `.env` hoặc credential lên Git.

## Giấy phép

Dự án nội bộ / học tập — cập nhật giấy phép nếu cần phân phối công khai.
