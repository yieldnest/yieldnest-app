

const PoolOverview = () => {
  return (
    <section className='flex justify-between items-center mt-6 lg:w-4/6'>
      <div>
        <div className='my-4'>
          <h1 className='text-6xl font-semibold'>ynETH</h1>
        </div>
        <div className='flex gap-6 items-start'>
          <div>
            <h2 className='mb-2'>your ynETH</h2>
            <p className='text-3xl font-semibold'>5.234</p>
            <p>$22,454</p>
          </div>
          <div >
            <h2 className='mb-2'>APY</h2>
            <p className='text-3xl font-semibold'>12.4%</p>
          </div>
        </div>
      </div>
      <div className='text-right'>
        <div className='mb-2'>
          <h2 className='mb-1'>Total Staked</h2>
          <p className='text-xl font-semibold'>$5,234,098</p>
        </div>
        <div className='mb-2'>
          <h2 className='mb-1'>Validators</h2>
          <p className='text-xl font-semibold'>213</p>
        </div>
      </div>
    </section>
  )
}

export default PoolOverview
