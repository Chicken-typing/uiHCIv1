import { useState, useEffect } from 'react'
import { RadioGroup } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../action';
import { useParams } from "react-router-dom"
import { addToCart } from '../../action';
import { Button, Comment, Divider, Avatar, Rate, Typography, message, Space, Tooltip, Popconfirm } from 'antd';
import { DollarCircleFilled } from '@ant-design/icons'
import CommentRating from '../../components/CommentRating';
import sizeGuide from '../../assets/images/size-guide.png'
import { UserOutlined } from '@ant-design/icons'
import postReview from '../../services/postReview';
import { HeartFilled } from '@ant-design/icons'
import _ from 'lodash'
import store from '../../store';
import { DeleteOutlined } from '@ant-design/icons';
import deleteReview from '../../services/deleteReview'
const product = {
  name: 'Nike Air Zoom Pegasus 39 Premium',
  price: '$200',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Shoes', href: '#' },
  ],
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
  ],
  sizes: [
    { name: '35', inStock: true },
    { name: '36', inStock: true },
    { name: '37', inStock: true },
    { name: '38', inStock: true },
    { name: '39', inStock: true },
    { name: '40', inStock: true },
    { name: '41', inStock: true },
    { name: '42', inStock: true },
    { name: '43', inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}

const CommentComponent = (prodId, props, key) => {
  const state = store.getState()
  const user = state?.User?.userInfor
  const action = [
    <Tooltip key="remove" title="Remove">
      <Popconfirm
        title="Are you sure to delete this comment?"
        onConfirm={() => deleteReview(prodId, props._id)}
        okText="Yes"
        cancelText="No">
        <span><DeleteOutlined /></span>
      </Popconfirm>
    </Tooltip>
  ]
  return (
    <div key={key}>
      <Comment
        actions={user.role === 'customer' ? [] : action}
        author={
          <Space
            direction="vertical"
            size='small'
            style={{
              display: 'flex',
            }}>
            <Rate disabled defaultValue={props.rating} character={<HeartFilled />} />
            <Typography.Text>{props.name}</Typography.Text>
          </Space>}
        avatar={<Avatar src={<UserOutlined />} size={32} style={{ backgroundColor: 'black' }} alt="User" />}
        content={
          <Typography.Paragraph
            ellipsis={
              {
                rows: 3,
                expandable: true,
                symbol: 'more',
              }
            }>
            {props.comment}
          </Typography.Paragraph>
        }
        style={{
          // backgroundColor: "#F3F3F3",
          padding: '0px 10px 0px 20px'
        }}
      />
      <Divider style={{ margin: "5px 0px" }} />
    </div>
  )
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductDetail() {
  const [selectedSize, setSelectedSize] = useState(0)
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProduct())
  }, [])
  const { id } = useParams()
  const res = useSelector(state => state.fetchProduct.products.find(prod => prod._id === id))
  const handlePostComment = (values) => postReview(res._id, values)
  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                    {breadcrumb.name}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {res.name}
              </a>
            </li>
          </ol>
        </nav>

        <div className=" flex justify-center mt-6 aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
          <img
            alt='Default image'
            src={res.defaultImage.thumbUrl}
            className="h-[40%] w-[40%] object-cover object-center mr-[20px] "
          />
          <img
            // src={product.images[2].src}
            // alt={product.images[2].alt}

            src={res.images[1].thumbUrl}

            className="h-[40%] w-[40%] object-cover object-center "
          />
        </div>
        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{res.name}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <div className="text-3xl tracking-tight text-gray-900 pt-6 font-bold flex items-center"><DollarCircleFilled /> <span className='ml-2'>{res.price}</span>
              <span className='ml-4'><Rate character={<HeartFilled />} disabled allowHalf value={res.rating} /></span></div>
            <Divider />
            <form className="mt-10" onSubmit={(e) => e.preventDefault()}>
              {/* Colors */}

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <Button type='text' className="text-sm font-medium " onClick={() => setVisible(!visible)}>
                    Size guide
                  </Button>
                </div>

                <RadioGroup value={selectedSize} onChange={(e) => setSelectedSize(e * 1)} className="mt-4">
                  <RadioGroup.Label className="sr-only"> Choose a size </RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {product.sizes.map((size) => (
                      <RadioGroup.Option
                        key={size.name}
                        value={size.name}
                        disabled={!product.sizes.includes(size)}
                        className={({ active }) =>
                          classNames(
                            size.inStock
                              ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                              : 'bg-gray-50 text-gray-200 cursor-not-allowed',
                            active ? 'ring-2 ring-indigo-500' : '',
                            'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                            {product.sizes.includes(size) ? (
                              <span
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked ? 'border-indigo-500' : 'border-transparent',
                                  'pointer-events-none absolute -inset-px rounded-md'
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                              >
                                <svg
                                  className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                >
                                  <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent
                 bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => {
                  if (selectedSize === 0) {
                    message.warning("Please select the size of shoes!")
                  } else {
                    const selectItem = {

                      ...res,

                      size: selectedSize
                    }
                    dispatch(addToCart(selectItem))
                    message.success("Add to cart success")
                  }
                }
                }
              >
                Add to Cart
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{res.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {product.highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Divider />
            <CommentRating callback={handlePostComment} />
            <div
              style={
                _.isEmpty(res.reviews)
                  ? {}
                  : {
                    marginTop: 20,
                    maxHeight: 400,
                    border: '1px solid #e7e7e7'
                  }}>
              {
                res?.reviews.map((review, index) => CommentComponent(res._id, review, index))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}