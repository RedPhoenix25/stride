# Generates the labelled mist placeholders in public/products.
# These are stand-ins until the real product photography is generated.
Add-Type -AssemblyName System.Drawing

$root = Join-Path $PSScriptRoot "..\public\products"
New-Item -ItemType Directory -Force -Path $root | Out-Null

$products = @(
  @{ slug = "velocity-runner-black"; name = "Velocity Runner" },
  @{ slug = "court-classic-white"; name = "Court Classic" },
  @{ slug = "trailbreak-gtx-olive"; name = "Trailbreak GTX" },
  @{ slug = "aero-knit-grey"; name = "Aero Knit" },
  @{ slug = "pace-low-black"; name = "Pace Low" },
  @{ slug = "sprint-2-volt"; name = "Sprint 2.0" },
  @{ slug = "training-tee-black"; name = "Training Tee" },
  @{ slug = "tech-fleece-hoodie-grey"; name = "Tech Fleece Hoodie" },
  @{ slug = "court-shorts-black"; name = "Court Shorts" },
  @{ slug = "compression-leggings-ink"; name = "Compression Leggings" },
  @{ slug = "windbreaker-jacket-volt"; name = "Windbreaker Jacket" },
  @{ slug = "oversized-jersey-white"; name = "Oversized Jersey" },
  @{ slug = "performance-cap-black"; name = "Performance Cap" },
  @{ slug = "gym-duffel-black"; name = "Gym Duffel 35L" },
  @{ slug = "training-socks-white"; name = "Training Socks 3-pack" },
  @{ slug = "insulated-bottle-volt"; name = "Insulated Bottle 750ml" }
)

$labelFont = New-Object System.Drawing.Font("Arial", 18, [System.Drawing.FontStyle]::Regular)
$metaFont = New-Object System.Drawing.Font("Arial", 13, [System.Drawing.FontStyle]::Regular)
$labelBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(140, 140, 132))
$mist = [System.Drawing.Color]::FromArgb(244, 244, 240)
$format = New-Object System.Drawing.StringFormat
$format.Alignment = [System.Drawing.StringAlignment]::Center
$format.LineAlignment = [System.Drawing.StringAlignment]::Center

foreach ($product in $products) {
  foreach ($view in @(@{ n = 1; label = "MAIN" }, @{ n = 2; label = "ANGLE" })) {
    $bitmap = New-Object System.Drawing.Bitmap(800, 1000)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.Clear($mist)
    $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAlias

    $nameRect = New-Object System.Drawing.RectangleF(0, 440, 800, 40)
    $graphics.DrawString($product.name.ToUpper(), $labelFont, $labelBrush, $nameRect, $format)

    $metaRect = New-Object System.Drawing.RectangleF(0, 492, 800, 32)
    $graphics.DrawString("$($view.label) $([char]0x00B7) 4:5", $metaFont, $labelBrush, $metaRect, $format)

    $file = Join-Path $root "$($product.slug)-$($view.n).jpg"
    $bitmap.Save($file, [System.Drawing.Imaging.ImageFormat]::Jpeg)

    $graphics.Dispose()
    $bitmap.Dispose()
  }
}

$labelFont.Dispose()
$metaFont.Dispose()
$labelBrush.Dispose()
$format.Dispose()

Get-ChildItem $root -Filter *.jpg | Measure-Object | Select-Object -ExpandProperty Count
