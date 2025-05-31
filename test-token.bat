@echo off
echo 🔍 ===== PRUEBA DE TOKEN CON CURL =====

REM Leer el token del archivo .env.local
for /f "tokens=2 delims==" %%a in ('findstr "STRAPI_API_TOKEN" .env.local') do set TOKEN=%%a

if "%TOKEN%"=="" (
    echo ❌ No se encontró STRAPI_API_TOKEN en .env.local
    pause
    exit /b 1
)

echo 🔑 Token encontrado: SÍ
echo 📡 Probando GraphQL en: https://strapi.harwinclick.com/graphql

REM Crear archivo temporal con la query
echo {"query":"mutation { createCliente(data: { firstName: \"Test\", lastName: \"Curl\", email: \"test-curl@test.com\", phone: \"123456789\", isActive: true, registrationDate: \"%date:~-4%-%date:~4,2%-%date:~7,2%T%time:~0,2%:%time:~3,2%:%time:~6,2%.000Z\", publishedAt: \"%date:~-4%-%date:~4,2%-%date:~7,2%T%time:~0,2%:%time:~3,2%:%time:~6,2%.000Z\" }) { documentId firstName lastName } }"} > temp_query.json

REM Ejecutar curl
curl -X POST ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer %TOKEN%" ^
  -d @temp_query.json ^
  https://strapi.harwinclick.com/graphql

REM Limpiar archivo temporal
del temp_query.json

echo.
echo 📊 Prueba completada
pause
