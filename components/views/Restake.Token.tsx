
const ViewStakeToken = () => {

  return (
    <>
			<div className={'pt-4'}>
				<div className={'mt-5 grid gap-5'}>
					{/* {lst.map((token, index): ReactElement => (
						<LSTDepositForm
							key={token.address}
							token={token}
              amount={amounts[index].raw === -1n ? toNormalizedBN(0) : amounts[index]}
							onUpdateAmount={(amount): void => onChangeAmount(index, amount)}
							isDisabled={false} />
					))} */}
				</div>
			</div>
			<div className={'mt-10 flex justify-start'}>
				<div className={'flex w-full flex-row space-x-4'}>
					{/* <ButtonY
						onClick={async (): Promise<void> => (
							!shouldApproveDeposit ? onApprove(
								toAddress(process.env.POOL_ADDRESS),
								'poolAllowance',
								set_txStatus
							) : onDeposit()
						)}
						isBusy={shouldApproveDeposit ? txStatus.pending : txStatusDeposit.pending}
						isDisabled={!canDeposit || !provider || toBigInt(estimateOut.value) === 0n}
						variant={'outlined'}
						className={'w-full md:w-[184px]'}>
						{shouldApproveDeposit ? 'Approve for Deposit' : 'Deposit'}
					</ButtonY> */}
				</div>
			</div>
		</>
  )
}

export default ViewStakeToken
