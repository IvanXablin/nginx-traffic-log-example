# Тестовый стенд для модуля traffic-accounting-nginx-module

###
Данный репозиторий является тестовым стендом для демонстрации возможностей подчета трафика по `accounting_id`, с помощью спеацильного [модуля](https://github.com/Lax/traffic-accounting-nginx-module)

#### Установка

```
docker compose up
```

После запуска проекта и перехода по http://localhost, начинается подсчет трафика и его запись в логи по пути `./nginx/logs`