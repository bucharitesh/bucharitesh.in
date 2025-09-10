// double escape for commas and slashes
const e = (str: string) => encodeURIComponent(encodeURIComponent(str));

const overlayImageUrl =
  'aHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vYnVjaGEvaW1hZ2UvdXBsb2FkL2Jfd2hpdGUvYnVjaGFfaDZ5eWtlLnBuZw==';

// TODO: Update OG image logic
export const createOgImage = ({
  title,
  meta,
}: {
  title: string;
  meta: string;
}) =>
  [
    // ACCOUNT PREFIX
    `https://res.cloudinary.com/bucha/image/upload`,
    // Composed Image Transformations
    `w_1600,h_836,q_100`,

    // TITLE
    // Karla google font in light primary
    `l_text:Karla_72_bold:${e(title)},co_rgb:ffe4e6,c_fit,w_1400,h_240`,
    // Positioning
    `fl_layer_apply,g_south_west,x_100,y_180`,

    // META
    // Karla, but smaller
    `l_text:Karla_48:${e(meta)},co_rgb:ffe4e680,c_fit,w_1400`,
    // Positioning
    `fl_layer_apply,g_south_west,x_100,y_100`,

    // PROFILE IMAGE
    // // dynamically fetched from my twitter profile
    `l_fetch:${overlayImageUrl}`,
    // // Transformations
    `c_thumb,r_max,w_380,h_380,q_100`,
    // // Positioning
    `fl_layer_apply,w_140,g_north_west,x_100,y_100`,

    // BG
    `grain-gradient_ctrjnp.png`,
  ].join('/');
