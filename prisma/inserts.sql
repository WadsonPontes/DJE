INSERT INTO "Coluna" ("id", "titulo", "posicao")
VALUES
    ('2aa8bdd7-4361-4b6f-a6a9-30efd7005b3e', 'Nova Publicação', 0),
    ('291ce7b3-0a89-4b7d-8e72-163df674ea2a', 'Publicação Lida', 1),
    (gen_random_uuid(), 'Enviar para Advogado Responsável', 2),
    ('b810b789-5aae-4811-9f61-e42f879b49b3', 'Concluído', 3);

INSERT INTO "Processo" ("id", "numero", "dataAtualizacao", "dataPublicacao", "posicao", "colunaId")
VALUES
    (gen_random_uuid(), '5018120-21.2021.8.13.0022', now(), now(), 0, '2aa8bdd7-4361-4b6f-a6a9-30efd7005b3e'),
    (gen_random_uuid(), 'Processo sem número', now(), now(), 0, '291ce7b3-0a89-4b7d-8e72-163df674ea2a'),
    (gen_random_uuid(), '8015120-21.2024.8.13.5111', now(), now(), 0, 'b810b789-5aae-4811-9f61-e42f879b49b3'),
    (gen_random_uuid(), '7777777-21.2007.8.13.7777', now(), now(), 1, 'b810b789-5aae-4811-9f61-e42f879b49b3');
