
INSERT INTO leave_request (leave_id, user_id, leave_type, start_date, end_date, reason, status, created_by, approved_by, created_at, updated_at)
VALUES 
    (UUID(), UUID(), 'SL', '2024-12-01', '2024-12-05', 'Sick due to fever', 'APPROVED', UUID(), NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (UUID(), UUID(), 'VL', '2024-12-10', '2024-12-15', 'Family vacation', 'APPROVED', UUID(), NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (UUID(), UUID(), 'ML', '2024-12-20', '2024-12-25', 'Maternity leave', 'APPROVED', UUID(), NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (UUID(), UUID(), 'MLT', '2024-12-30', '2025-01-05', 'Military service', 'APPROVED', UUID(), NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (UUID(), UUID(), 'OL', '2024-12-05', '2024-12-10', 'Religious ordination', 'APPROVED', UUID(), NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (UUID(), UUID(), 'PL', '2024-12-15', '2024-12-20', 'Personal time off', 'APPROVED', UUID(), NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


INSERT INTO setting (setting_group, setting_key, setting_value)
VALUES
    ('leaveType', 'SL', 'Sick Leave'),
    ('leaveType', 'VL', 'Vacation Leave'),
    ('leaveType', 'ML', 'Maternity Leave'),
    ('leaveType', 'MLT', 'Military Leave'),
    ('leaveType', 'OL', 'Ordination Leave'),
    ('leaveType', 'PL', 'Personal Leave');