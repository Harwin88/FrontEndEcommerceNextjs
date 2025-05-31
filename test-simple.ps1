$json = Get-Content test-rest-api.json -Raw
try {
    Write-Host "Enviando petición..."
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/orders/save" -Method POST -Body $json -ContentType "application/json"
    Write-Host "✅ Respuesta exitosa:"
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "❌ Error:" $_.Exception.Message
    if ($_.Exception.Response) {
        Write-Host "Status:" $_.Exception.Response.StatusCode
        Write-Host "StatusDescription:" $_.Exception.Response.StatusDescription
    }
}
