import ViewClaimToken from '@/components/views/Claim.Token'
import type { TTokenInfoArray } from '@/types/index'

// ! This feature is currently inactive, and needs more development to be used.
const ViewClaim = ({ tokens }: { tokens: TTokenInfoArray }) => {

  return (
    <section className='w-full'>
      <div className='my-6'>
        <div className='mx-auto w-5/6'>
          <div className='flex w-full flex-col'>
            <div className='flex flex-row items-center justify-between'>
              <h2 className='text-xl font-bold'>
                {`Claim ${tokens[0].symbol}`}
              </h2>
            </div>
            <ViewClaimToken tokens={tokens} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ViewClaim
