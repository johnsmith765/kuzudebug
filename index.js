const kuzu = require("kuzu");
const db = new kuzu.Database("./db");
const connection = new kuzu.Connection(db);

async function init() {

    const table_name = "NewTable";
    try {

        await connection.query(
            `CREATE NODE TABLE ${table_name}(
                    code STRING,
                    pk STRING,
                    id STRING,
                    ad_id STRING,
                    text STRING,
                    caption STRING,
                    caption_is_edited BOOLEAN,
                    taken_at TIMESTAMP,
                    video_versions STRING,
                    image_versions2 STRING,
                    owner STRING,
                    coauthor_producers STRING,
                    top_likers STRING,
                    facepile_top_likers STRING,
                    like_count UINT32,
                    product_type STRING,
                    media_type UINT32,
                    carousel_media STRING,
                    usertags STRING,
                    location STRING,
                    has_audio BOOLEAN,
                    clips_metadata STRING,
                    PRIMARY KEY (code)
                )`
        );
    } catch (error) {
        console.log(error.message);
    }


    const prepared = await connection.prepare(`MERGE (post:${table_name} {
                code : $code
            }) SET post.code = $code, 
            post.pk = $pk, 
            post.id = $id, 
            post.caption = $caption, 
            post.taken_at = TIMESTAMP($taken_at), 
            post.image_versions2 = $image_versions2, 
            post.owner = $owner, 
            post.top_likers = $top_likers, 
            post.facepile_top_likers = $facepile_top_likers, 
            post.like_count = $like_count, 
            post.product_type = $product_type, 
            post.media_type = $media_type, 
            post.carousel_media = $carousel_media RETURN post;`
    );

    try {
        const result = await connection.execute(prepared, {
            code: 'A6Aa2AAAA_a',
            pk: '1111111111111111111',
            id: '1111111111111111111_1111111111',
            caption: '{"text":"aaaaaa"}',
            taken_at: '2020-01-20T20:11:55.649Z',
            image_versions2: '{"candidates":[{"url":"111111111_11111111111111111_111111111111111111_n.jpg","height":1080,"width":1080}]}',
            owner: '{"pk":"1111111111"}',
            top_likers: '[]',
            facepile_top_likers: '[]',
            like_count: 198,
            product_type: 'carousel_container',
            media_type: 8,
            carousel_media: '["1111111111111111111_1111111111"]'
        })
        const all = await result.getAll();
        console.log(all);
    } catch (error) {
        console.log(error);
    }

    await connection.query(`DROP TABLE ${table_name}`);

}

init()