import img1 from '../../assets/slideImages/slide1.jpg';
import img2 from '../../assets/slideImages/slide2.jpg';
import img3 from '../../assets/slideImages/slide3.jpg';

const slides = [
    {
        sort: 1,
        label: '1 / 3',
        img: img1,
        current: true
    },
    {
        sort: 2,
        label: '2 / 3',
        img: img2,
        current: false
    },
    {
        sort: 3,
        label: '3 / 3',
        img: img3,
        current: false
    }
];

export default slides;