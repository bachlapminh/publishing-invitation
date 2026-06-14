# Hướng dẫn ảnh placeholder — Ước Rồng Online

Tất cả ảnh trên trang dùng **placeholder tự load**. Khi bạn bỏ file ảnh **đúng tên**
vào thư mục này (`assets/images/`), trang sẽ **tự hiển thị ảnh thật** — không cần sửa HTML.

## Cách dùng
1. Chuẩn bị ảnh, đặt **đúng tên file** bên dưới (phân biệt hoa/thường, đuôi `.png`).
2. Copy vào thư mục `assets/images/`.
3. Tải lại trang (F5). Ảnh sẽ hiện thay cho khung placeholder.

> Mọi slot ảnh dùng khung:
> ```html
> <figure class="image-slot" data-filename="TEN_ANH.png">
>   <img src="assets/images/TEN_ANH.png" alt="TEN_ANH.png" loading="lazy">
> </figure>
> ```
> `alt` = tên file, `src` trỏ vào `assets/images/`. Khi ảnh chưa có, JS/CSS hiện khung
> placeholder kèm tên file cần đặt vào.

## Danh sách ảnh cần đặt

| Tên file | Mô tả | Tỉ lệ gợi ý | Kích thước gợi ý |
|---|---|---|---|
| `LOGO_GAME.png` | Logo Ước Rồng Online (nền trong suốt) | ~5:2 | 600×240+ |
| `LOGO_STUDIO.png` | Logo studio / pháp nhân (nền trong suốt) | ~5:2 | 600×240+ |
| `KEY_VISUAL_MAIN.png` | Key visual chính cho hero | 4:3 | 1200×900 |
| `BACKGROUND_WORLD.png` | Background thế giới game (dùng nhẹ/mờ sau hero) | 16:9 | 1920×1080 |
| `TEAM_PHOTO_01.png` | Ảnh team hoặc môi trường làm việc | 4:3 | 1200×900 |
| `WORKSPACE_PHOTO_01.png` | Ảnh văn phòng / quy trình sản xuất | 4:3 | 1200×900 |
| `SCREENSHOT_WORLD_01.png` | Ảnh map / thế giới | 16:9 | 1600×900 |
| `SCREENSHOT_COMBAT_01.png` | Ảnh combat | 16:9 | 1600×900 |
| `SCREENSHOT_CHARACTER_01.png` | Ảnh nhân vật / UI | 16:9 | 1600×900 |
| `SCREENSHOT_BOSS_EVENT_01.png` | Ảnh boss / event | 16:9 | 1600×900 |
| `SCREENSHOT_SHOP_IAP_01.png` | Ảnh shop / IAP | 16:9 | 1600×900 |
| `SCREENSHOT_SOCIAL_01.png` | Ảnh cộng đồng / party / bang hội | 16:9 | 1600×900 |
| `ADMIN_TOOL_SCREENSHOT_01.png` | Ảnh admin / GM tool (nếu có) | 4:3 | 1200×900 |
| `ROADMAP_VISUAL_01.png` | Ảnh / timeline roadmap (tùy chọn thay graphic) | 21:7 | 1680×560 |
| `QR_GAMEPLAY_VIDEO.png` | QR dẫn tới video gameplay | 1:1 | 600×600 |
| `QR_CONTACT.png` | QR liên hệ / Zalo / website | 1:1 | 600×600 |

## Lưu ý
- **Không** chèn ảnh có bản quyền / IP thật (ví dụ Dragon Ball) vào source.
  Chỉ thay bằng ảnh do bạn sở hữu hoặc được phép sử dụng.
- Ưu tiên `.png` để đồng bộ với cấu hình mặc định. Nếu muốn dùng `.jpg`,
  cần sửa thuộc tính `src` tương ứng trong `index.html`.
- Logo và QR nên có nền trong suốt hoặc nền trắng để hiển thị đẹp.
- Ảnh càng đúng tỉ lệ gợi ý thì càng ít bị cắt (`object-fit: cover`).
