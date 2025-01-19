INSERT INTO category (id, name, description)
VALUES
    (nextval('category_sequence'), 'Technology', 'All about tech-related topics'),
    (nextval('category_sequence'), 'Health', 'Covers health and wellness articles'),
    (nextval('category_sequence'), 'Lifestyle', 'Articles on lifestyle and living trends'),
    (nextval('category_sequence'), 'Education', 'Topics about education and learning resources');
