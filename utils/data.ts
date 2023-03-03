import {Category, DataType} from "@/interfaces";

export const tabList: DataType<keyof typeof Category>[] = [
  {value: "head", name: "머리"},
  {value: "face", name: "표정"},
  {value: "body", name: "옷"},
  {value: "acc", name: "악세사리"},
  {value: "item", name: "아이템"},
  {value: "background", name: "배경"},
];

export const order = [
  {name:'body', order:1},
  {name:'head', order:2},
  {name:'face', order:3},
]

export const initial = {
  nely: [
    {order: 1, name: "body", src: "https://lush.s3.ap-northeast-2.amazonaws.com/nely/initial/body.svg", width: 300, y: 318.79},
    {order: 2, name: "head", src: "https://lush.s3.ap-northeast-2.amazonaws.com/nely/initial/head.svg", width: 300, y: 122},
    {order: 3, name: "face", src: "https://lush.s3.ap-northeast-2.amazonaws.com/nely/initial/face.svg", width: 150, y: 251.04},
  ],
  hippy: [
    {order: 1, name: "body", src: "https://lush.s3.ap-northeast-2.amazonaws.com/hippy/initial/body.svg", width: 250.5, y: 289.11},
    {order: 2, name: "head", src: "https://lush.s3.ap-northeast-2.amazonaws.com/hippy/initial/head.svg", width: 349.5, y: 235},
    {order: 3, name: "face", src: "https://lush.s3.ap-northeast-2.amazonaws.com/hippy/initial/face.svg", width: 199.5, y: 315.32},
  ],
};

export const getImageSync = (src: string,color?:string) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const initial = new Image();
    initial.src = src;
    initial.onload = () => resolve(initial);
    initial.onerror = () => reject(null)
  });
};
