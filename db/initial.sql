-- DROP TABLE Files
CREATE TABLE files (
    id bigserial PRIMARY KEY,
    file_name VARCHAR(200) not null,
    file_hash VARCHAR(200) not null
)