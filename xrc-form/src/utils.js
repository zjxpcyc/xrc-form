
// // pick get attrs values from object o
// export const pick = (o, attrs) => {
//   if (typeof o !== 'object') {
//     throw new Error('The 1st param of pick function must be an object');
//   }

//   if (!Array.isArray(attrs)) {
//     throw new Error('The 2nd param of pick function must be an array');
//   }

//   return Object.keys(o).reduce((acc, it) => {
//     if (attrs.indexOf(it) > -1) {
//       return { ...acc, [it]: o[it] };
//     }

//     return acc;
//   }, {});
// };

// twoPart split object o to two parts
export const twoPart = (o, attrs) => {
  if (typeof o !== 'object') {
    throw new Error('The 1st param of pick function must be an object');
  }

  if (!Array.isArray(attrs)) {
    throw new Error('The 2nd param of pick function must be an array');
  }

  const has = {};
  const nohas = {};

  Object.keys(o).forEach((it) => {
    if (attrs.indexOf(it) > -1) {
      has[it] = o[it];
    } else {
      nohas[it] = o[it];
    }
  });

  return [has, nohas];
};

export const keyGen = p => `xrc-form-${p}`;
