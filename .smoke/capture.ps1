$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$base = "http://127.0.0.1:3118"
$outDir = "C:\Users\james\dev\orgs\oss\jami.studio-rerun-b\.smoke"
$routes = @("/", "/projects", "/projects/intercal")
$widths = @(1440, 1024, 768, 390)

New-Item -ItemType Directory -Force -Path $outDir | Out-Null

foreach ($w in $widths) {
  foreach ($route in $routes) {
    $slug = if ($route -eq "/") { "home" } elseif ($route -eq "/projects") { "projects" } else { "projects_intercal" }
    $file = Join-Path $outDir "pass2_${w}_${slug}.png"
    $url = "$base$route"
    Start-Process -FilePath $chrome -ArgumentList @(
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--window-size=$w,1200",
      "--screenshot=$file",
      $url
    ) -Wait -NoNewWindow
    if (Test-Path $file) {
      $size = (Get-Item $file).Length
      Write-Output "pass2_${w}_${slug}.png -> $size bytes"
    } else {
      Write-Output "pass2_${w}_${slug}.png -> MISSING"
    }
  }
}