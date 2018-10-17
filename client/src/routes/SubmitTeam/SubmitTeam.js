import React, { Component } from 'react'
import { Button, Form, Input, notification } from 'antd'
import { Formik } from 'formik'

const FormItem = Form.Item

class SubmitTeam extends Component {
  submitTeam = async values => {
    const { contract, accounts } = this.props
    const { teamName, github } = values

    try {
      await contract
        .submitTeam(teamName, github, { from: accounts[0] })
        .once('transactionHash', function(hash) {
          console.log('hash', hash)

          notification.info({
            message: 'Pending',
            description:
              'Your transaction has been submitted. Your transaction hash is: ' +
              hash,
          })
        })
        .on('error', function(error) {
          // we deal with the error below but possible to capture here too
          // console.error('error', error)
        })
        .then(function(receipt) {
          // will be fired once the receipt is mined
          console.log('receipt', receipt)

          notification.success({
            message: 'Success',
            description: 'Your transaction has been successfully mined.',
          })
        })
    } catch (error) {
      // if the tx threw an error or the user cancelled with metamask we get an error here
      console.error(error)

      notification.error({
        message: 'Error',
        description: 'There was an error submitting your transaction.',
      })
    }
  }

  render() {
    return (
      <div>
        <h2>Submit Team</h2>

        <Formik
          initialValues={{ teamName: '', github: '' }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true)
            await this.submitTeam(values)
            setSubmitting(false)
          }}
        >
          {({
            isSubmitting,
            handleSubmit,
            handleChange,
            handleBlur,
            values,
          }) => (
            <Form layout="vertical" onSubmit={handleSubmit}>
              <FormItem label="Team name">
                <Input
                  type="text"
                  name="teamName"
                  value={values.teamName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormItem>
              <FormItem label="Git url">
                <Input
                  type="url"
                  name="github"
                  value={values.github}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                >
                  Submit
                </Button>
              </FormItem>
            </Form>
          )}
        </Formik>
      </div>
    )
  }
}

export default SubmitTeam
