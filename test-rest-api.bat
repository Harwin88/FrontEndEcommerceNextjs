@echo off
echo Probando REST API...
powershell -Command "$json = Get-Content test-rest-api.json -Raw; try { $response = Invoke-RestMethod -Uri 'http://localhost:3000/api/orders/save' -Method POST -Body $json -ContentType 'application/json'; Write-Host 'Respuesta exitosa:'; $response | ConvertTo-Json -Depth 10 } catch { Write-Host 'Error:' $_.Exception.Message }"
pause
