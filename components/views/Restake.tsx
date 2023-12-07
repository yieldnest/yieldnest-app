
import { useState } from 'react'
import ViewRestakeETH from './Restake.ETH'

/**
 * ViewRestake is a high level form component that allows users to restake their tokens.
 * It supports restaking of ETH tokens with support for other tokens coming soon.
 */
const ViewRestake = ({ type }: { type: 'ETH' }) => {
  const [shouldRestakeEth] = useState<boolean>(type === 'ETH')

  return (
    <section className={'w-full'}>
      <div className={'my-6'}>
        <div className={'mx-auto w-5/6'}>
          <div className={'flex w-full flex-col'}>
            <div className={'flex flex-row items-center justify-between'}>
              <h2 className={'text-xl font-bold'}>
                {`Restake ${type}`}
              </h2>
              {/* <SettingsPopover /> */}
            </div>
            {/* --------ViewRestakeToken will be added later when more staking pools are created--------  */}
            {/*  {!shouldStakeEth && (
							<ViewRestakeToken />
						)} */}
            {shouldRestakeEth && (
              <ViewRestakeETH />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ViewRestake
