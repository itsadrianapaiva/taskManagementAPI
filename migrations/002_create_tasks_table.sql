CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    summary TEXT NOT NULL,
    performedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    technicianId INT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_technician FOREIGN KEY (technicianId)         REFERENCES users(id)
    ON DELETE CASCADE,
    CONSTRAINT chk_summary_length CHECK (CHAR_LENGTH(summary) <= 2500),
    INDEX idx_technicianId (technicianId),
    INDEX idx_performedAt (performedAt)
)