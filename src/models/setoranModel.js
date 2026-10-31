const pool = require("../config/database");

// Membuat transaksi setoran beserta detailnya
const createSetoran = async (data) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const { id_nasabah, detail } = data;

    // Simpan data utama setoran
    const setoranResult = await client.query(
      `INSERT INTO setoran (id_nasabah)
       VALUES ($1)
       RETURNING *`,
      [id_nasabah]
    );

    const setoran = setoranResult.rows[0];

    // Simpan setiap detail sampah
    const detailSetoran = [];

    for (const item of detail) {
      const jenisResult = await client.query(
        `SELECT harga_per_kg
         FROM jenis_sampah
         WHERE id_jenis_sampah = $1`,
        [item.id_jenis_sampah]
      );

      if (jenisResult.rows.length === 0) {
        throw new Error(
          `Jenis sampah dengan ID ${item.id_jenis_sampah} tidak ditemukan`
        );
      }

      const harga = jenisResult.rows[0].harga_per_kg;

      const detailResult = await client.query(
        `INSERT INTO detail_setoran
         (id_setoran, id_jenis_sampah, berat, harga_per_kg, subtotal)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [
          setoran.id_setoran,
          item.id_jenis_sampah,
          item.berat,
          harga,
          Number(item.berat) * Number(harga),
        ]
      );

      detailSetoran.push(detailResult.rows[0]);
    }

    await client.query("COMMIT");

    return {
      ...setoran,
      detail: detailSetoran,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

// Mengambil semua riwayat setoran
const getAllSetoran = async () => {
  const result = await pool.query(`
    SELECT
      s.id_setoran,
      s.tanggal_setoran,
      n.id_nasabah,
      n.nama AS nama_nasabah,
      json_agg(
        json_build_object(
          'id_detail', d.id_detail,
          'nama_jenis', j.nama_jenis,
          'berat', d.berat,
          'harga_per_kg', d.harga_per_kg,
          'subtotal', d.subtotal
        )
        ORDER BY d.id_detail
      ) AS detail,
      SUM(d.subtotal) AS total_setoran
    FROM setoran s
    JOIN nasabah n
      ON s.id_nasabah = n.id_nasabah
    JOIN detail_setoran d
      ON s.id_setoran = d.id_setoran
    JOIN jenis_sampah j
      ON d.id_jenis_sampah = j.id_jenis_sampah
    GROUP BY
      s.id_setoran,
      s.tanggal_setoran,
      n.id_nasabah,
      n.nama
    ORDER BY s.tanggal_setoran DESC
  `);

  return result.rows;
};

const getSetoranById = async (id) => {
  const result = await pool.query(
    `
    SELECT
      s.id_setoran,
      s.tanggal_setoran,
      n.id_nasabah,
      n.nama AS nama_nasabah,
      json_agg(
        json_build_object(
          'id_detail', d.id_detail,
          'nama_jenis', j.nama_jenis,
          'berat', d.berat,
          'harga_per_kg', d.harga_per_kg,
          'subtotal', d.subtotal
        )
        ORDER BY d.id_detail
      ) AS detail,
      SUM(d.subtotal) AS total_setoran
    FROM setoran s
    JOIN nasabah n ON s.id_nasabah = n.id_nasabah
    JOIN detail_setoran d ON s.id_setoran = d.id_setoran
    JOIN jenis_sampah j ON d.id_jenis_sampah = j.id_jenis_sampah
    WHERE s.id_setoran = $1
    GROUP BY
      s.id_setoran,
      s.tanggal_setoran,
      n.id_nasabah,
      n.nama
    `,
    [id]
  );

  return result.rows[0];
};

module.exports = {
  createSetoran,
  getAllSetoran,
  getSetoranById,
};