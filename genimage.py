from PIL import Image, ImageDraw, ImageFont, ImageChops
import os

def create_kayler_grid_seed_x2(filename="kayler_grid_seed_x2.png"):
    # --- 配置区域 ---
    
    # 功能：生成一张网格图片，用于截图软件ShareX的Kayler Grid Seed功能

    # 1. 尺寸设置 (这里做了双倍处理)
    GRID_SPACING_CM = 2.0  # 逻辑间距保持 2cm
    
    # 【核心修改】：将 DPI 从 110 提升到 220
    # 这会直接导致生成的图片 宽x2，高x2，总面积x4
    TARGET_DPI = 220       
    
    # 自动计算单元格像素
    CELL_SIZE = int((GRID_SPACING_CM / 2.54) * TARGET_DPI)
    
    # 网格行列 (保持 6x6)
    COLS = 6
    ROWS = 6
    
    # 2. 文本序列
    TEXT_SEQ = "Kayler"
    
    # 3. 线条样式
    LINE_COLOR = (180, 180, 180, 120)
    # 【修改】：因为图片变大了一倍，线条也加粗一点，否则看不清
    LINE_WIDTH = 3  
    
    # 4. 文字样式
    TEXT_COLOR = (150, 150, 150, 200)
    
    # 字体大小自动适配 (依然保持 30% 比例)
    FONT_SIZE = int(CELL_SIZE * 0.3)
    
    # 5. 字母周围的擦除半径
    ERASE_RADIUS = FONT_SIZE * 0.9

    # --- 字体加载 ---
    try:
        font = ImageFont.truetype("arial.ttf", FONT_SIZE)
    except IOError:
        font = ImageFont.load_default()

    # --- 计算画布大小 ---
    width = CELL_SIZE * COLS
    height = CELL_SIZE * ROWS
    
    print(f"当前设置: 双倍尺寸 (DPI {TARGET_DPI})")
    print(f"单元格大小: {CELL_SIZE}px")
    print(f"总图片尺寸: {width}x{height} (非常大且清晰)")

    # --- 创建图层 ---
    lines_layer = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    lines_draw = ImageDraw.Draw(lines_layer)

    mask_layer = Image.new("L", (width, height), 255)
    mask_draw = ImageDraw.Draw(mask_layer)

    text_layer = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    text_draw = ImageDraw.Draw(text_layer)

    # --- 循环绘制 ---
    for r in range(ROWS):
        for c in range(COLS):
            x_start = c * CELL_SIZE
            y_start = r * CELL_SIZE
            x_end = x_start + CELL_SIZE
            y_end = y_start + CELL_SIZE
            cx = x_start + CELL_SIZE / 2
            cy = y_start + CELL_SIZE / 2

            # 画线
            lines_draw.line([(x_start, y_start), (x_end, y_end)], fill=LINE_COLOR, width=LINE_WIDTH)
            lines_draw.line([(x_end, y_start), (x_start, y_end)], fill=LINE_COLOR, width=LINE_WIDTH)

            # 计算字符
            seq_index = (r * COLS + c) % len(TEXT_SEQ)
            char = TEXT_SEQ[seq_index]

            # 画擦除圆
            mask_draw.ellipse(
                (cx - ERASE_RADIUS, cy - ERASE_RADIUS, cx + ERASE_RADIUS, cy + ERASE_RADIUS),
                fill=0 
            )

            # 画文字
            bbox = text_draw.textbbox((0, 0), char, font=font)
            text_w = bbox[2] - bbox[0]
            text_h = bbox[3] - bbox[1]
            # y轴微调
            text_draw.text((cx - text_w / 2, cy - text_h / 2 - 4), char, font=font, fill=TEXT_COLOR)

    # --- 合成 ---
    empty_img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    lines_with_holes = Image.composite(lines_layer, empty_img, mask_layer)
    final_image = Image.alpha_composite(lines_with_holes, text_layer)

    # --- 保存 ---
    final_image.save(filename)
    print(f"✅ 生成完毕: {os.path.abspath(filename)}")

if __name__ == "__main__":
    create_kayler_grid_seed_x2()