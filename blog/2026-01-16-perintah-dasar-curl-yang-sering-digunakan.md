---
slug: perintah-dasar-curl-yang-sering-digunakan
title: Perintah Dasar cURL yang Sering Digunakan untuk REST API
authors: topekox
tags: [curl, http, rest, api, restapi]
---

**cURL (Client URL)** adalah alat command-line (baris perintah) dan library open source untuk mentransfer data ke atau dari server menggunakan berbagai protokol seperti HTTP, HTTPS, FTP, dan lainnya. Fungsinya sangat serbaguna, sering digunakan dalam pengembangan web, otomatisasi, pengujian, untuk berinteraksi dengan API, mengunduh/mengunggah file, atau menguji konektivitas jaringan. 

<!-- truncate -->

Berikut ini adalah perintah dasar cURL yang sering digunakan untuk operasi REST API:

## GET

```
curl -v http://localhost:8082/spring-rest/foos/9
```

## POST

```
curl -d 'id=9&name=baeldung' http://localhost:8082/spring-rest/foos/new
```

```
curl -d @request.json -H "Content-Type: application/json" 
  http://localhost:8082/spring-rest/foos/new
```

```
curl -d '{"id":9,"name":"baeldung"}' -H 'Content-Type: application/json' 
  http://localhost:8082/spring-rest/foos/new
```

## PUT

```
curl -d @request.json -H 'Content-Type: application/json' 
  -X PUT http://localhost:8082/spring-rest/foos/9
```

## DELETE

```
curl -X DELETE http://localhost:8082/spring-rest/foos/9
```

## Costum Headers

```
curl -H "Host: com.baeldung" http://example.com/
```

```
curl -H "User-Agent:" http://example.com/
```

```
curl -d @request.json -H "Content-Type: application/json" 
  -H "Accept: application/json" http://localhost:8082/spring-rest/foos/new
```

## Authentication

```
curl --user baeldung:secretPassword http://example.com/
```

```
curl -X POST "http://103.150.101.12:8181/api/v1/login" -d '{"username" : "ucup", "password" : "test123"}'
```

```
curl -H "Authorization: Bearer b1094abc0-54a4-3eab-7213-877142c33fh3" http://example.com/
````

## Referensi 

* https://www.baeldung.com/curl-rest
