CREATE TABLE user (
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

CREATE TABLE role (
    role_id VARCHAR(50) PRIMARY KEY,
    role_name VARCHAR(100) NOT NULL
);

CREATE TABLE user_role (
    user_id VARCHAR(40),
    role_id VARCHAR(50),
    PRIMARY KEY (user_id, role_id)
);

CREATE TABLE employee (
    employee_id VARCHAR(40) PRIMARY KEY,
    user_id VARCHAR(40),
    full_name VARCHAR(100),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    position VARCHAR(100),
    department VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    line_user_id VARCHAR(100),
    line_group_id VARCHAR(100),
    hire_date DATE,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_by VARCHAR(40) NOT NULL,
    updated_by VARCHAR(40) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

CREATE TABLE leave_request (
    leave_id VARCHAR(40) PRIMARY KEY,
    employee_id VARCHAR(40) NOT NULL,
    leave_type VARCHAR(3) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason VARCHAR(500),
    status VARCHAR(10) NOT NULL,
    is_auto BOOLEAN NOT NULL DEFAULT FALSE,
    auto_approve_at DATETIME,
    created_by VARCHAR(40) NOT NULL,
    updated_by VARCHAR(40) NOT NULL,
    approved_by VARCHAR(40) NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    approved_at DATETIME
);

CREATE TABLE setting (
    setting_group VARCHAR(20),
    setting_key VARCHAR(30),
    setting_value VARCHAR(50),
    PRIMARY KEY (setting_group, setting_key)
);