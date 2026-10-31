--
-- PostgreSQL database dump
--

\restrict bLFA9robNfKxGMINH1qJjneh3vlPYIO3eyKWct9Yrpl1Fyas7LxqEhBJeKfVZjV

-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: detail_setoran; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.detail_setoran (
    id_detail integer NOT NULL,
    id_setoran integer NOT NULL,
    id_jenis_sampah integer NOT NULL,
    berat numeric(10,2) NOT NULL,
    harga_per_kg numeric(12,2) NOT NULL,
    subtotal numeric(14,2) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT detail_setoran_berat_check CHECK ((berat > (0)::numeric)),
    CONSTRAINT detail_setoran_harga_per_kg_check CHECK ((harga_per_kg >= (0)::numeric)),
    CONSTRAINT detail_setoran_subtotal_check CHECK ((subtotal >= (0)::numeric))
);


--
-- Name: detail_setoran_id_detail_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.detail_setoran_id_detail_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: detail_setoran_id_detail_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.detail_setoran_id_detail_seq OWNED BY public.detail_setoran.id_detail;


--
-- Name: jenis_sampah; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.jenis_sampah (
    id_jenis_sampah integer NOT NULL,
    nama_jenis character varying(100) NOT NULL,
    satuan character varying(20) DEFAULT 'kg'::character varying NOT NULL,
    harga_per_kg numeric(12,2) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT jenis_sampah_harga_per_kg_check CHECK ((harga_per_kg >= (0)::numeric))
);


--
-- Name: jenis_sampah_id_jenis_sampah_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.jenis_sampah_id_jenis_sampah_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: jenis_sampah_id_jenis_sampah_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.jenis_sampah_id_jenis_sampah_seq OWNED BY public.jenis_sampah.id_jenis_sampah;


--
-- Name: nasabah; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.nasabah (
    id_nasabah integer NOT NULL,
    nama character varying(100) NOT NULL,
    nomor_identitas character varying(30),
    alamat text,
    no_telepon character varying(20),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: nasabah_id_nasabah_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.nasabah_id_nasabah_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: nasabah_id_nasabah_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.nasabah_id_nasabah_seq OWNED BY public.nasabah.id_nasabah;


--
-- Name: setoran; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.setoran (
    id_setoran integer NOT NULL,
    id_nasabah integer NOT NULL,
    tanggal_setoran timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: setoran_id_setoran_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.setoran_id_setoran_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: setoran_id_setoran_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.setoran_id_setoran_seq OWNED BY public.setoran.id_setoran;


--
-- Name: detail_setoran id_detail; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.detail_setoran ALTER COLUMN id_detail SET DEFAULT nextval('public.detail_setoran_id_detail_seq'::regclass);


--
-- Name: jenis_sampah id_jenis_sampah; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.jenis_sampah ALTER COLUMN id_jenis_sampah SET DEFAULT nextval('public.jenis_sampah_id_jenis_sampah_seq'::regclass);


--
-- Name: nasabah id_nasabah; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.nasabah ALTER COLUMN id_nasabah SET DEFAULT nextval('public.nasabah_id_nasabah_seq'::regclass);


--
-- Name: setoran id_setoran; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.setoran ALTER COLUMN id_setoran SET DEFAULT nextval('public.setoran_id_setoran_seq'::regclass);


--
-- Name: detail_setoran detail_setoran_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.detail_setoran
    ADD CONSTRAINT detail_setoran_pkey PRIMARY KEY (id_detail);


--
-- Name: jenis_sampah jenis_sampah_nama_jenis_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.jenis_sampah
    ADD CONSTRAINT jenis_sampah_nama_jenis_key UNIQUE (nama_jenis);


--
-- Name: jenis_sampah jenis_sampah_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.jenis_sampah
    ADD CONSTRAINT jenis_sampah_pkey PRIMARY KEY (id_jenis_sampah);


--
-- Name: nasabah nasabah_nomor_identitas_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.nasabah
    ADD CONSTRAINT nasabah_nomor_identitas_key UNIQUE (nomor_identitas);


--
-- Name: nasabah nasabah_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.nasabah
    ADD CONSTRAINT nasabah_pkey PRIMARY KEY (id_nasabah);


--
-- Name: setoran setoran_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.setoran
    ADD CONSTRAINT setoran_pkey PRIMARY KEY (id_setoran);


--
-- Name: detail_setoran unique_jenis_per_setoran; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.detail_setoran
    ADD CONSTRAINT unique_jenis_per_setoran UNIQUE (id_setoran, id_jenis_sampah);


--
-- Name: idx_detail_jenis_sampah; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_detail_jenis_sampah ON public.detail_setoran USING btree (id_jenis_sampah);


--
-- Name: idx_detail_setoran; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_detail_setoran ON public.detail_setoran USING btree (id_setoran);


--
-- Name: idx_setoran_nasabah; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_setoran_nasabah ON public.setoran USING btree (id_nasabah);


--
-- Name: detail_setoran fk_detail_jenis_sampah; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.detail_setoran
    ADD CONSTRAINT fk_detail_jenis_sampah FOREIGN KEY (id_jenis_sampah) REFERENCES public.jenis_sampah(id_jenis_sampah) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: detail_setoran fk_detail_setoran; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.detail_setoran
    ADD CONSTRAINT fk_detail_setoran FOREIGN KEY (id_setoran) REFERENCES public.setoran(id_setoran) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: setoran fk_setoran_nasabah; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.setoran
    ADD CONSTRAINT fk_setoran_nasabah FOREIGN KEY (id_nasabah) REFERENCES public.nasabah(id_nasabah) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

\unrestrict bLFA9robNfKxGMINH1qJjneh3vlPYIO3eyKWct9Yrpl1Fyas7LxqEhBJeKfVZjV

