/* =================================================================
   ƯỚC RỒNG ONLINE — NỘI DUNG TRANG (content.js)
   -----------------------------------------------------------------
   ĐÂY LÀ NƠI DUY NHẤT ĐỂ SỬA TOÀN BỘ CHỮ TRÊN TRANG.
   Sửa xong lưu file lại và up đè là trang tự cập nhật.

   QUY TẮC SỬA (đọc kỹ để không làm hỏng file):
   1. Chỉ sửa phần CHỮ nằm GIỮA hai dấu nháy kép  "..."
   2. KHÔNG xóa dấu phẩy , dấu ngoặc { } [ ] và tên khóa (title, body...).
   3. KHÔNG dùng dấu nháy kép " bên trong câu. Cần thì dùng nháy đơn ' hoặc « ».
   4. Chuỗi dạng  "[ABC]"  sẽ tự hiện thành ô placeholder. Bỏ ngoặc vuông để điền thật.
   5. Tên ảnh trỏ tới file trong assets/images/. Danh sách ở README_IMAGE_PLACEHOLDERS.md
   ================================================================= */

window.SITE_CONTENT = {

  /* ====== THÔNG TIN CHUNG ====== */
  meta: {
    lang: "vi",
    title: "Chiến Binh Huyền Thoại — Đề xuất hợp tác phát hành",
    description: "Chiến Binh Huyền Thoại — MMORPG nhập vai 2D (Mobile & PC) đã hoàn thiện gameplay lõi. Hồ sơ đề xuất hợp tác phát hành gửi publisher.",
    themeColor: "#103326",
    brand: { lead: "Chiến Binh Huyền Thoại", strong: "Online" },
    /* Logo trên thanh NAV: logo game (trái) + logo studio (phải, kèm nhãn) */
    logos: {
      game: "LOGO_GAME.png",
      studio: "LOGO_STUDIO.png",
      studioLabel: "Sản xuất bởi"
    }
  },

  /* ====== MENU ĐIỀU HƯỚNG ====== */
  nav: {
    items: [
      { label: "Tổng quan", href: "#tong-quan" },
      { label: "Studio",    href: "#studio" },
      { label: "Sản phẩm",  href: "#san-pham" },
      { label: "Hệ thống",  href: "#he-thong" },
      { label: "Roadmap",   href: "#roadmap" },
      { label: "Hợp tác",   href: "#hop-tac" },
      { label: "Liên hệ",   href: "#lien-he" }
    ],
    cta: { label: "Đề xuất meeting", href: "#lien-he" }
  },

  /* ====== SECTION 1 — HERO (tập trung nội dung, không key visual) ====== */
  hero: {
    bgImage: "",   /* để rỗng = nền gradient thuần (an toàn, tập trung nội dung). Điền tên ảnh nếu muốn nền mờ. */
    eyebrow: "Đề xuất hợp tác phát hành",
    titleLead: "Chiến Binh",
    titleAccent: "Huyền Thoại",
    /* Lý do tồn tại của tài liệu */
    sub: "MMORPG nhập vai 2D trên Mobile & PC, đã hoàn thiện gameplay lõi. Tài liệu này giới thiệu sản phẩm và đề xuất một đối tác publisher để cùng đánh giá giấy phép, phát hành, marketing và thương mại hóa.",
    ctas: [
      { label: "Đề xuất meeting/demo sản phẩm", href: "#lien-he",   variant: "gold" },
      { label: "Xem tổng quan sản phẩm",        href: "#tong-quan", variant: "ghost-light" }
    ],
    badges: [
      "MMORPG nhập vai 2D",
      "Mobile (Android/iOS) & PC",
      "Đã hoàn thiện gameplay",
      "Free-to-play · không pay-to-win"
    ]
  },

  /* ====== SECTION 2 — TỔNG QUAN CƠ HỘI HỢP TÁC (có hook + KPI) ====== */
  executive: {
    eyebrow: "Executive Summary",
    title: "Tổng quan cơ hội hợp tác",
    /* Câu hook mở đầu */
    lead: "Một MMORPG 2D đã hoàn thiện phần lõi gameplay với chiều sâu nội dung lớn — thứ còn thiếu là một đối tác phát hành. Đó là điều tài liệu này hướng đến.",
    /* Dải số liệu chứng minh chiều sâu sản phẩm (KPI) */
    stats: [
      { num: "3",   label: "Chủng tộc chơi được" },
      { num: "6",   label: "Nhân vật/Chiến binh" },
      { num: "5",   label: "Hành tinh phiêu lưu" },
      { num: "~50", label: "Khu vực / bản đồ" },
      { num: "20", label: "Bậc sức mạnh" },
      { num: "5",   label: "Chương cốt truyện" }
    ],
    cards: [
      {
        index: "01",
        title: "Sản phẩm sẵn sàng — rút ngắn time-to-market",
        body: "Gameplay lõi đã hoàn thiện cùng khối lượng nội dung lớn. Publisher có thể bước vào đánh giá phát hành ngay, thay vì chờ nhiều năm phát triển từ đầu."
      },
      {
        index: "02",
        title: "Studio ổn định — vận hành dài hạn",
        body: "Đội ngũ khoảng 15 nhân sự có pháp nhân, môi trường sản xuất thực tế, cam kết bảo trì – cập nhật – liveops sau phát hành. Sản phẩm không bị bỏ rơi."
      },
      {
        index: "03",
        title: "Phân vai rõ ràng — đôi bên cùng mạnh",
        body: "Studio tập trung sản xuất và vận hành nội dung; publisher phụ trách giấy phép, marketing và thương mại. Mô hình hợp tác rõ ràng ngay từ đầu."
      }
    ]
  },

  /* ====== SECTION 3 — VỀ STUDIO ====== */
  studio: {
    eyebrow: "Về studio",
    title: "Năng lực studio sản xuất",
    bullets: [
      "Studio có pháp nhân hoạt động rõ ràng.",
      "Quy mô đội ngũ khoảng 15 nhân sự.",
      "Có môi trường làm việc, quy trình sản xuất và khả năng duy trì sản phẩm sau phát hành.",
      "Định vị: tập trung sản xuất, bảo trì, phát triển nội dung và đảm bảo roadmap."
    ],
    facts: [
      { k: "Pháp nhân",           v: "CTY TNHH APEXGAMES" },
      { k: "Quy mô team",         v: "Khoảng 15 nhân sự" },
      { k: "Vai trò chính",       v: "Sản xuất, bảo trì, cập nhật nội dung" },
      { k: "Sản phẩm giới thiệu", v: "Chiến Binh Huyền Thoại" },
      { k: "Trạng thái sản phẩm", v: "Đã hoàn thiện phiên bản gameplay" }
    ],
    /* main = ảnh lớn; row = 2 ảnh nhỏ bên dưới */
    media: {
      main: { image: "TEAM_PHOTO_01.jpg", caption: "Đội ngũ studio" },
      row: [
        { image: "WORKSPACE_PHOTO_01.jpg", caption: "Phòng họp & quy trình làm việc" },
        { image: "TEAM_PHOTO_02.jpg",      caption: "Văn hóa đội ngũ" }
      ]
    }
  },

  /* ====== SECTION 4 — TỔNG QUAN SẢN PHẨM (nội dung Dracoria) ====== */
  product: {
    eyebrow: "Tổng quan sản phẩm",
    title: "Chiến Binh Huyền Thoại là gì?",
    paragraphs: [
      "Chiến Binh Huyền Thoại là MMORPG nhập vai 2D phong cách hoạt hình chibi, lấy bối cảnh thiên hà giả tưởng Dragon Balls — nơi người chơi hóa thân thành chiến binh, khai mở sức mạnh đặc biệt và đi tìm Ngọc Rồng.",
      "Người chơi phiêu lưu qua nhiều hành tinh, rèn luyện kỹ năng, chiến đấu thời gian thực và chung tay ngăn kẻ ác chiếm đoạt Ngọc Rồng. Sản phẩm hỗ trợ Mobile (Android, iOS) và PC, thiết kế cho vận hành nhiều server và cập nhật nội dung dài hạn."
    ],
    specs: [
      { k: "Thể loại",  v: "MMORPG nhập vai 2D" },
      { k: "Nền tảng",  v: "Mobile (Android, iOS) & PC" },
      { k: "Đồ họa",    v: "2D chibi hoạt hình" },
      { k: "Độ tuổi",   v: "12+" },
      { k: "Mô hình",   v: "Free-to-play · không pay-to-win" },
      { k: "Thế giới & nhân vật", v: "3 chủng tộc · 6 chiến binh chơi được, mỗi người một bộ kỹ năng riêng biệt", wide: true }
    ],
    gallery: [
      { image: "SCREENSHOT_WORLD_01.jpg",     caption: "Thế giới & bản đồ" },
      { image: "SCREENSHOT_COMBAT_01.jpg",    caption: "Chiến đấu thời gian thực" },
      { image: "SCREENSHOT_CHARACTER_01.jpg", caption: "Nhân vật & kỹ năng" }
    ]
  },

  /* ====== SECTION 5 — VÒNG LẶP GAMEPLAY ====== */
  gameplay: {
    eyebrow: "Core Gameplay Loop",
    title: "Vòng lặp gameplay chính",
    steps: [
      { num: "1", label: "Đăng nhập · chọn nhân vật" },
      { num: "2", label: "Nhận nhiệm vụ từ NPC" },
      { num: "3", label: "Chiến đấu PvE · khám phá" },
      { num: "4", label: "Nhận thưởng & kinh nghiệm" },
      { num: "5", label: "Nâng cấp nhân vật · trang bị" },
      { num: "6", label: "Hoạt động cộng đồng · PvP" },
      { num: "∞", label: "Thử thách & nội dung mới", accent: true }
    ],
    note: "Trải nghiệm cốt lõi xoay quanh phát triển nhân vật, khai mở sức mạnh, chinh phục các hành tinh và tham gia hoạt động cộng đồng trong một thế giới trực tuyến liên tục."
  },

  /* ====== SECTION 6 — HỆ THỐNG ĐÃ HOÀN THIỆN ======
     Mục có thể là chuỗi "..." hoặc { t: "...", soft: "ghi chú mờ" } */
  systems: {
    eyebrow: "Mức độ hoàn thiện",
    title: "Các hệ thống sản phẩm đã hoàn thiện",
    groups: [
      {
        title: "Nhân vật & sức mạnh",
        items: ["3 chủng tộc: Saiyan · Namek · Trái Đất", "6 nhân vật chơi được", "6 bậc sức mạnh", "Kỹ năng & combo riêng từng nhân vật", "Trang bị & nâng cấp"]
      },
      {
        title: "Thế giới & PvE",
        items: ["5 hành tinh chính", "~50 khu vực / bản đồ", "Nhiệm vụ chính · phụ · hàng ngày", "Boss & dungeon", "5 chương cốt truyện"]
      },
      {
        title: "PvP & cộng đồng",
        items: ["Tổ đội & bang hội", "PvP tại khu vực chỉ định", "Xếp hạng ELO", "Võ Đài Siêu Hạng · Đại Hội Chiến Binh", "Chiến Dịch Bang Hội (raid)"]
      },
      {
        title: "Kinh tế & vật phẩm",
        items: ["Soft/Medium/Hard currency", "Cửa hàng NPC", "Chợ ký gửi giữa người chơi", "Trang bị · nguyên liệu · tiêu hao", "Kiểm duyệt giao dịch tự động + GM"]
      },
      {
        title: "Vận hành & nội dung",
        items: ["Sự kiện theo mùa", "Nhiệm vụ làm mới hàng ngày", { t: "Công cụ GM / admin", soft: "nội bộ" }, "Lịch sử giao dịch & log", "Cập nhật nội dung định kỳ"]
      }
    ],
    mediaCard: { image: "SCREENSHOT_BOSS_EVENT_01.jpg", caption: "Boss & sự kiện trong game" },
    gallery: [
      { image: "SCREENSHOT_COMBAT_02.jpg", caption: "Combo kỹ năng" },
      { image: "shop.jpg", caption: "Cửa hàng & giao dịch vật phẩm" }
    ]
  },

  /* ====== SECTION 7 — GALLERY ====== */
  gallery: {
    eyebrow: "Gallery",
    title: "Một số hình ảnh trong game",
    items: [
      { image: "SCREENSHOT_WORLD_01.jpg",      caption: "Thế giới mở" },
      { image: "SCREENSHOT_COMBAT_01.jpg",     caption: "Chiến đấu thời gian thực" },
      { image: "SCREENSHOT_COMBAT_02.jpg",     caption: "Kỹ năng" },
      { image: "SCREENSHOT_BOSS_EVENT_01.jpg", caption: "Boss & sự kiện lớn" },
      { image: "SCREENSHOT_CHARACTER_01.jpg",  caption: "Nhân vật & đồng đội" },
      { image: "shop.jpg",   caption: "Cửa hàng & thương mại" }
    ]
  },

  /* ====== SECTION 8 — KỸ THUẬT & VẬN HÀNH ====== */
  technical: {
    eyebrow: "Kỹ thuật & vận hành",
    title: "Tình trạng kỹ thuật và khả năng vận hành",
    intro: "Sản phẩm đã hoàn thiện các thành phần kỹ thuật cần thiết để vận hành gameplay trực tuyến trên Mobile và PC. Studio có khả năng tiếp tục bảo trì, sửa lỗi, tối ưu hiệu năng, cập nhật nội dung và hỗ trợ publisher trong quá trình thử nghiệm / phát hành.",
    cards: [
      { title: "Client", items: ["Mobile (Android, iOS) & PC", "[Hỏi xem DEV có muốn gáy bẩn gì ở đây không]"] },
      { title: "Server", items: ["[Hỏi xem DEV có muốn gáy bẩn gì ở đây không]"] },
      { title: "Công cụ vận hành", items: ["Admin / GM tool", "Cấu hình event", "Lịch sử giao dịch & log"] },
      { title: "Hỗ trợ sau phát hành", items: ["Sửa lỗi", "Update nội dung", "Hỗ trợ liveops", "Đảm bảo roadmap"] }
    ]
    /* (Đã bỏ ảnh admin tool theo yêu cầu) */
  },

  /* ====== SECTION 9 — ĐỊNH HƯỚNG DOANH THU ====== */
  monetization: {
    eyebrow: "Monetization",
    title: "Định hướng doanh thu",
    intro: "Chiến Binh Huyền Thoại theo mô hình free-to-play. Tiền tệ cơ bản Xu / Ngọc kiếm được qua nhiệm vụ và chiến đấu. Doanh thu đến từ vật phẩm tiện ích và trang trí, với nguyên tắc cốt lõi: không pay-to-win. Các hạng mục thương mại sẽ được tinh chỉnh cùng publisher.",
    tagsTitle: "Nhóm doanh thu dự kiến",
    tags: [
      "Trang phục & vật phẩm trang trí (cosmetic)",
      "Hiệu ứng hiển thị nhân vật",
      "Gói tiện ích đẩy nhanh tiến độ",
      "Gói sự kiện theo mùa",
      "Quay thưởng vật phẩm trang trí",
      { t: "Thẻ tháng / gói đặc quyền", soft: "nếu phù hợp" }
    ],
    principlesTitle: "Nguyên tắc",
    principles: [
      "Không pay-to-win — vật phẩm trả phí không ảnh hưởng sức mạnh chiến đấu",
      "Tập trung vào cosmetic và tiện lợi",
      "Phù hợp với event và liveops dài hạn",
      "Tinh chỉnh cùng publisher theo dữ liệu vận hành"
    ]
  },

  /* ====== SECTION 10 — ROADMAP ====== */
  roadmap: {
    eyebrow: "Roadmap",
    title: "Roadmap vận hành sau phát hành",
    phases: [
      { num: "1", title: "Chuẩn bị phát hành", body: "Review build, kiểm tra pháp lý / nội dung, chuẩn bị tài liệu vận hành, tối ưu onboarding, chuẩn bị marketing asset." },
      { num: "2", title: "Test thương mại / Soft launch", body: "Mở test giới hạn, theo dõi dữ liệu, sửa lỗi, tối ưu server, điều chỉnh shop / event, thu thập feedback." },
      { num: "3", title: "Ra mắt chính thức", body: "Mở server, triển khai marketing campaign, vận hành event ra mắt, theo dõi doanh thu và retention, hỗ trợ CSKH / GM." },
      { num: "4", title: "Cập nhật dài hạn", body: "Update nội dung mới, event định kỳ, cân bằng kinh tế, mở rộng cộng đồng, tối ưu monetization theo dữ liệu." }
    ]
    /* (Đã bỏ ảnh roadmap — dùng timeline đồ họa) */
  },

  /* ====== SECTION 11 — MÔ HÌNH HỢP TÁC ====== */
  cooperation: {
    eyebrow: "Mô hình hợp tác",
    title: "Mô hình hợp tác đề xuất",
    columns: [
      {
        chip: "Studio phụ trách",
        variant: "green",
        items: ["Sản xuất sản phẩm", "Bảo trì và sửa lỗi", "Cập nhật nội dung", "Đảm bảo roadmap", "Hỗ trợ kỹ thuật vận hành", "Phối hợp liveops và event"]
      },
      {
        chip: "Publisher phụ trách",
        variant: "gold",
        items: ["Tư vấn và triển khai giấy phép", "Chiến lược phát hành", "Ngân sách marketing", "Truyền thông và user acquisition", "Vận hành thương mại", { t: "Thanh toán / CSKH / cộng đồng", soft: "nếu phù hợp" }]
      }
    ],
    note: "Các điều khoản về ngân sách, phạm vi chi phí, tỷ lệ chia sẻ doanh thu và quyền lợi thương mại sẽ được hai bên trao đổi sau khi publisher đánh giá build, tài liệu sản phẩm và kế hoạch phát hành."
  },

  /* ====== SECTION 12 — QUY TRÌNH TRAO ĐỔI ====== */
  process: {
    eyebrow: "Quy trình",
    title: "Quy trình trao đổi đề xuất",
    steps: [
      "Gửi hồ sơ giới thiệu",
      "Meeting giới thiệu sản phẩm",
      "Ký NDA nếu cần",
      "Demo gameplay / cung cấp build",
      "Publisher đánh giá sản phẩm",
      "Thảo luận mô hình hợp tác",
      "Thống nhất kế hoạch phát hành",
      "Triển khai các bước tiếp theo"
    ],
    note: "Studio sẵn sàng chuẩn bị các tài liệu bổ sung theo yêu cầu của publisher: gameplay video, build trải nghiệm, GDD rút gọn, roadmap, monetization draft và thông tin kỹ thuật cần thiết.",
    media: { image: "QR_GAMEPLAY_VIDEO.png", caption: "Quét QR — Video gameplay" }
  },

  /* ====== SECTION 13 — PHÁP LÝ & NỘI DUNG (minh bạch IP, sẵn sàng phối hợp) ====== */
  legal: {
    eyebrow: "Pháp lý & nội dung",
    title: "Minh bạch nội dung và định hướng pháp lý",
    paragraphs: [
      "Chúng tôi minh bạch ngay từ đầu: phiên bản hiện tại của sản phẩm sử dụng nhiều yếu tố nhận diện và nội dung dựa trên IP Dragon Ball (Bảy Viên Ngọc Rồng) — một thương hiệu truyện tranh / anime nổi tiếng thuộc bên thứ ba. Studio ý thức rõ đây là nội dung cần được xử lý đúng quy định trước khi thương mại hóa chính thức.",
      "Chúng tôi chủ động nêu rõ điều này để cùng publisher lựa chọn phương án phù hợp — bao gồm xin giấy phép IP nếu khả thi, hoặc chuyển đổi (re-skin) sang IP gốc đã được studio chuẩn bị sẵn (vũ trụ Dracoria), đồng thời đảm bảo điều kiện kiểm duyệt và phát hành trên các store."
    ],
    optionsTitle: "Các phương án có thể triển khai cùng publisher",
    options: [
      "Xin giấy phép sử dụng IP Dragon Ball nếu khả thi",
      "Chuyển đổi (re-skin) sang IP gốc — studio đã có sẵn bản dựng vũ trụ Dracoria",
      "Điều chỉnh nhận diện thương mại theo thị trường mục tiêu",
      "Đảm bảo điều kiện kiểm duyệt & phát hành trên App Store / Google Play"
    ],
    note: "Studio sẵn sàng phối hợp điều chỉnh và hoàn thiện sản phẩm theo yêu cầu của publisher để đảm bảo tính khả thi và an toàn pháp lý trong phát hành thương mại."
  },

  /* ====== SECTION 14 — LIÊN HỆ / CTA CUỐI ====== */
  contact: {
    eyebrow: "Bước tiếp theo",
    title: "Đề xuất bước tiếp theo",
    paragraphs: [
      "Chúng tôi mong muốn có cơ hội giới thiệu trực tiếp sản phẩm Chiến Binh Huyền Thoại đến Quý Đối tác thông qua một buổi trao đổi, demo gameplay hoặc cung cấp build trải nghiệm.",
      "Mục tiêu của buổi trao đổi là để hai bên cùng đánh giá mức độ phù hợp của sản phẩm, phương án giấy phép, kế hoạch phát hành, mô hình hợp tác và roadmap thương mại hóa."
    ],
    ctaBanner: {
      strong: "Đề xuất:",
      text: "Sắp xếp buổi meeting / demo sản phẩm trong thời gian phù hợp với Quý Đối tác."
    },
    fields: [
      { k: "Tên",   v: "Danny" },
      { k: "Zalo",  v: "0888888444" },
      { k: "Email", v: "khanh.apexgames@gmail.com" }
    ],
  },

  /* ====== FOOTER ====== */
  footer: {
    tagline: "Đề xuất hợp tác phát hành — tài liệu giới thiệu sản phẩm.",
    copyrightCompany: "[TÊN PHÁP NHÂN]",
    copyrightSuffix: "Tài liệu phục vụ mục đích trao đổi hợp tác."
  }

};
