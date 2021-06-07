-- DROP TABLE Files
CREATE TABLE files (
    id bigserial PRIMARY KEY,
    file_name VARCHAR(200) not null,
    file_hash VARCHAR(200) not null
)

-- DROP TABLE Setup
CREATE TABLE setup (
    id bigserial PRIMARY KEY,
    path VARCHAR(200) not null,
    status BOOLEAN not null
)