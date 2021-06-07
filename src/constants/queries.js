const SELECT_FILE_HASH = `SELECT file_name, file_hash FROM public.files where file_name = $1`;

const INSERT_HASH = `INSERT INTO public.files(file_name, file_hash)
    VALUES ($1, $2);`;

const SELECT_SETUP = `SELECT status from public.setup where path = $1;`;

const UPDATE_SETUP = `INSERT INTO public.setup(path, status) VALUES ($1, true);`;

module.exports = { SELECT_FILE_HASH, INSERT_HASH, SELECT_SETUP, UPDATE_SETUP };