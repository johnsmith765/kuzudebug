const kuzu = require("kuzu");
const db = new kuzu.Database("/home/ashfaq/.config/Electron/graphwise/kuzu");
const connection = new kuzu.Connection(db);

async function init() {
    try {
        await connection.query(
            `CREATE NODE TABLE InstaPost(
                    code STRING,
                    pk STRING,
                    id STRING,
                    ad_id STRING,
                    text STRING,
                    caption STRING,
                    caption_is_edited boolean,
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


    const prepared = await connection.prepare(`MERGE (post:InstaPost {
            code : $code
        }) SET 
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

    const result = await connection.execute(prepared, {
        code: 'A6Ta2AAAA_a',
        pk: '1111111111111111111',
        id: '3111111111111111111_1111111111',
        caption: '{"text":"asfsef"}',
        taken_at: '2020-01-20T20:11:55.649Z',
        image_versions2: '{"candidates":[]}',
        owner: '{"pk":"1111111111"}',
        top_likers: '[]',
        facepile_top_likers: '[]',
        like_count: 195,
        product_type: 'carousel_container',
        media_type: 8,
        carousel_media: '["3111111111111111111_1111111111","3111111111111111111_1111111111"]'
    })
    console.log(result);
}

init()