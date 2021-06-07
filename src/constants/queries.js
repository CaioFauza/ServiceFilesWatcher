const SELECT_FILE_HASH = `SELECT file_name, file_hash FROM public.files where file_name = $1`;

const INSERT_HASH = `INSERT INTO public.files(file_name, file_hash)
    VALUES ($1, $2);`;

module.exports = { SELECT_FILE_HASH, INSERT_HASH };