$ErrorActionPreference = 'Stop'
try {
 $siteNode = (Get-Command node -ErrorAction Stop).Source
 $siteUrl = 'http://127.0.0.1:4177'
 $siteAlreadyRunning = $false
 try {
  $siteResponse = Invoke-WebRequest -Uri $siteUrl -UseBasicParsing -TimeoutSec 2
  $siteAlreadyRunning = $siteResponse.Content -match 'Qelviora Technologies'
 } catch {}
 if (-not $siteAlreadyRunning) {
  $env:PORT = '4177'
  $siteServerPath = Join-Path $PSScriptRoot 'server.mjs'
  $siteProcess = Start-Process -FilePath $siteNode -ArgumentList @('"' + $siteServerPath + '"') -WorkingDirectory $PSScriptRoot -WindowStyle Hidden -PassThru
  $siteReady = $false
  for ($siteAttempt=0; $siteAttempt -lt 30; $siteAttempt++) {
   Start-Sleep -Milliseconds 300
   try {
    $siteResponse = Invoke-WebRequest -Uri $siteUrl -UseBasicParsing -TimeoutSec 2
    if ($siteResponse.Content -match 'Qelviora Technologies') {$siteReady=$true;break}
   } catch {}
   if ($siteProcess.HasExited) {break}
  }
  if (-not $siteReady) {throw 'The local website server could not start. Check that port 4177 is available.'}
 }
 Start-Process $siteUrl
} catch {
 Write-Host 'Unable to launch the website:' -ForegroundColor Red
 Write-Host $_.Exception.Message
 Write-Host 'This launcher needs Node.js installed. Extract the ZIP before running it.'
 Read-Host 'Press Enter to close'
}

