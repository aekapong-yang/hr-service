CREATE TABLE auth (
    user_id VARCHAR(40) PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    status VARCHAR(10) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    last_login DATETIME NOT NULL,
    access_token VARCHAR(1000),
    refresh_token VARCHAR(1000)
);

CREATE TABLE leave_request (
    leave_id VARCHAR(40) PRIMARY KEY,
    user_id VARCHAR(40) NOT NULL,
    username VARCHAR(100) NOT NULL,
    leave_type VARCHAR(3) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason VARCHAR(500),
    status VARCHAR(10) NOT NULL,
    created_by VARCHAR(40) NOT NULL,
    updated_by VARCHAR(40) NOT NULL,
    approved_by VARCHAR(40) NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

CREATE TABLE setting (
    setting_group VARCHAR(20),
    setting_key VARCHAR(30),
    setting_value VARCHAR(50),
    PRIMARY KEY (setting_group, setting_key)
);