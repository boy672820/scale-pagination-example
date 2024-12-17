## MySQL Replication 구성하기

Docker Compose로 생성된 데이터베이스 컨테이너들은 아직 Replication 구성이 완료되지 않았습니다. 때문에 아래 절차대로 진행하여 Replication을 구성할 수 있습니다.

먼저, Master 설정이 필요합니다.<br />
mysql-master 컨테이너에 접속하여 아래 쿼리를 실행해주세요.
해당 쿼리는 Slave 데이터베이스에서 접속할 계정의 비밀번호와 replication 권한을 부여하는 쿼리입니다.

```sql
> ALTER USER 'replication_user'@'%' IDENTIFIED WITH 'mysql_native_password' BY '123';
> GRANT REPLICATION SLAVE ON *.* TO 'replication_user'@'%';
> FLUSH PRIVILEGES;
```

다음은 Slave 데이터베이스에서 참조할 바이너리 파일과 포지션 값을 알야아 합니다.

`SHOW MASTER STATUS;` 쿼리를 실행하여 '바이너리 파일'과 '포지션 값'을 알아야 합니다.

```
mysql> SHOW MASTER STATUS;
+------------------+----------+--------------+------------------+-------------------+
| File             | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |
+------------------+----------+--------------+------------------+-------------------+
| mysql-bin.000003 |      618 |              |                  |                   |
+------------------+----------+--------------+------------------+-------------------+
1 row in set (0.00 sec)
```

'바이너리 파일'과 '포지션'을 알았으니 Slave 데이터베이스에 접속합니다.

방금 조회한 '바이너리 파일'과 '포지션 값' 정보를 아래 쿼리에 삽입 후 실행해주세요.

```sql
> CHANGE MASTER TO
    MASTER_HOST='mysql-master',
    MASTER_USER='replication_user',
    MASTER_PASSWORD='123',
    MASTER_LOG_FILE='mysql-bin.000003',
    MASTER_LOG_FILE='mysql-bin.{바이너리 로그 파일}',
    MASTER_LOG_POS={포지션 값};
```

Master 데이터베이스 설정이 완료되면 아래 쿼리를 실행합니다.

```bash
> START SLAVE;
```

`SHOW SLAVE STATUS\G` 쿼리로 설정이 완료되었는지 확인해 봅니다.

```
mysql> SHOW SLAVE STATUS\G;
*************************** 1. row ***************************
               Slave_IO_State: Waiting for source to send event
                  Master_Host: mysql-master
                  Master_User: replication_user
                  Master_Port: 3306
                Connect_Retry: 60
              Master_Log_File: mysql-bin.000003
          Read_Master_Log_Pos: 618
               Relay_Log_File: 4dd3e6bbe377-relay-bin.000002
                Relay_Log_Pos: 326
        Relay_Master_Log_File: mysql-bin.000003
             Slave_IO_Running: Yes
            Slave_SQL_Running: Yes
            ...
```

결과에서 `Slave_IO_Running`와 `Slave_SQL_Running` 값이 Yes이면 Mater-Slave 구성이 정상적으로 완료된 겁니다.

>[!TIP]
>
>만약, `Slave_IO_Running: connecting` 상태로 되어있다면 Master의 replication_user의 비밀번호 설정이 잘못되었거나, docker network 구성을 의심해보아야 합니다.
>특히, replication_user 비밀번호 설정할 때 `mysql_native_password` 플러그인을 사용하지 않는다면, 기본 플러그인인 `caching_sha2_password`로 설정되어 있을 확률이 높습니다. `caching_sha2_password`는 MySQL 8버전의 기본 비밀번호 암호화 설정으로, 이 설정이 되어있는 계정은 SSL/TLS 또는 RSA 키 페어 사용이 필요합니다. 운영 환경에서는 필수로 설정하는게 올바르지만, 개발 환경에서는 `mysql_native_password` 플러그인으로 replication_user 계정의 비밀번호를 설정해주세요.