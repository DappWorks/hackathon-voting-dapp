import React, { Component } from 'react'
import { Button, Form, Input } from 'antd'
import { Formik } from 'formik'

const FormItem = Form.Item

class SubmitTeam extends Component {
  submitTeam = async values => {
    const { contract, accounts } = this.props
    const { teamName, github } = values

    try {
      await contract.submitTeam(teamName, github, { from: accounts[0] })
    } catch (error) {
      alert('There was an error submitting your transaction.')
      console.error(error)
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
