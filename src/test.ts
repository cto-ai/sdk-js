import ux from './ux'

// RUN THIS FILE:  npx ts-node src/test.ts

const prompShow = async () => {
  // IMPORTANT***, major change is change every question to array
  const { deleteDescription } = await ux.prompt<{
    deleteDescription: string
  }>([{
    type: 'input',
    name: 'deleteDescription',
    message: `Provide a description for why workflowname
     is being deleted ${ux.colors.reset.green('→')}\n\n ${ux.colors.white(
      '✍️  Description:',
    )}`,
    afterMessage: ux.colors.reset.green('✓'),
    validate: input => {
      if (input === '') {
        return 'You need to provide a delete description of your workflow before continuing'
      }
      if (input.length > 255) {
        return 'Sorry, the maximum length for a delete description is 255 characters'
      }
      return true
    },
  }])
  console.log(deleteDescription)
}

const printShow = async () => {
  await ux.print(
    `\n🔑 Add a config for team TEAM ${ux.colors.green(
      '→',
    )}`,
  )

}

const spinnerShow = async () => {
  await ux.spinner.start(
    `💡 ${ux.colors.white(
      `Checking the billing status for team:`,
    )} ${ux.colors.callOutCyan("Myteam")}`,
  )

  await new Promise(resolve =>
    setTimeout(resolve, 5000)
  );

  // **** SPINNER END ****
  ux.spinner.stop("Finish")


  await new Promise(resolve =>
    setTimeout(resolve, 2000)
  );
}

const waitShow = async () => {
  console.log("wait 2 seconds")
  await ux.wait(2000)
}

const showUx = async () => {
  await printShow()
  await prompShow()
  await spinnerShow()
  await waitShow()



}

showUx()