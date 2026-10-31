-- =========================================
-- DATABASE: SakuraCycle
-- =========================================

-- 1. Tabel NASABAH
CREATE TABLE nasabah (
    id_nasabah SERIAL PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    nomor_identitas VARCHAR(30) UNIQUE,
    alamat TEXT,
    no_telepon VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabel JENIS SAMPAH
CREATE TABLE jenis_sampah (
    id_jenis_sampah SERIAL PRIMARY KEY,
    nama_jenis VARCHAR(100) NOT NULL UNIQUE,
    satuan VARCHAR(20) NOT NULL DEFAULT 'kg',
    harga_per_kg NUMERIC(12,2) NOT NULL
        CHECK (harga_per_kg >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabel SETORAN
CREATE TABLE setoran (
    id_setoran SERIAL PRIMARY KEY,
    id_nasabah INTEGER NOT NULL,
    tanggal_setoran TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_setoran_nasabah
        FOREIGN KEY (id_nasabah)
        REFERENCES nasabah(id_nasabah)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

-- 4. Tabel DETAIL SETORAN
CREATE TABLE detail_setoran (
    id_detail SERIAL PRIMARY KEY,
    id_setoran INTEGER NOT NULL,
    id_jenis_sampah INTEGER NOT NULL,
    berat NUMERIC(10,2) NOT NULL
        CHECK (berat > 0),
    harga_per_kg NUMERIC(12,2) NOT NULL
        CHECK (harga_per_kg >= 0),
    subtotal NUMERIC(14,2) NOT NULL
        CHECK (subtotal >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_detail_setoran
        FOREIGN KEY (id_setoran)
        REFERENCES setoran(id_setoran)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_detail_jenis_sampah
        FOREIGN KEY (id_jenis_sampah)
        REFERENCES jenis_sampah(id_jenis_sampah)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT unique_jenis_per_setoran
        UNIQUE (id_setoran, id_jenis_sampah)
);

-- =========================================
-- INDEXES
-- =========================================

CREATE INDEX idx_setoran_nasabah
ON setoran(id_nasabah);

CREATE INDEX idx_detail_setoran
ON detail_setoran(id_setoran);

CREATE INDEX idx_detail_jenis_sampah
ON detail_setoran(id_jenis_sampah);