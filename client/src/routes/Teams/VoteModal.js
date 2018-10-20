import React, { Component } from 'react'
import { Modal, Button, Form, Input, notification } from 'antd'
import { Formik } from 'formik'

const FormItem = Form.Item

class VoteModal extends React.Component {
  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleOk = e => {
    const { id } = this.props

    this.setState({
      visible: false,
    })
  }

  handleCancel = e => {
    this.setState({
      visible: false,
    })
  }

  submitVote = async values => {
    const { contract, accounts, id } = this.props
    const { technical, creativity, usefulness, general } = values

    await contract
      .vote(id, technical, creativity, usefulness, general, {
        from: accounts[0],
      })
      .once('transactionHash', hash => {
        notification.info({
          message: 'Pending',
          description:
            'Your transaction has been submitted. Your transaction hash is: ' +
            hash,
        })
      })
      .on('error', error => {
        console.error(error)

        notification.error({
          message: 'Error',
          description: 'There was an error submitting your transaction.',
        })
      })
      .then(receipt => {
        notification.success({
          message: 'Success',
          description: 'Your transaction has been successfully mined.',
        })
      })
  }

  renderVoteForm = () => {
    return (
      <Formik
        initialValues={{
          technical: 0,
          creativity: 0,
          usefulness: 0,
          general: 0,
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true)
          await this.submitVote(values)
          setSubmitting(false)
        }}
      >
        {({ isSubmitting, handleSubmit, handleChange, handleBlur, values }) => (
          <Form layout="vertical" onSubmit={handleSubmit}>
            <FormItem label="Technical">
              <Input
                type="number"
                min={0}
                max={10}
                name="technical"
                value={values.technical}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormItem>
            <FormItem label="Creativity">
              <Input
                type="number"
                min={0}
                max={10}
                name="creativity"
                value={values.creativity}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormItem>
            <FormItem label="Usefulness">
              <Input
                type="number"
                min={0}
                max={10}
                name="usefulness"
                value={values.usefulness}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormItem>
            <FormItem label="General">
              <Input
                type="number"
                min={0}
                max={10}
                name="general"
                value={values.general}
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
    )
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Vote
        </Button>
        <Modal
          title={`Vote for ${this.props.name}`}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[]}
        >
          {this.renderVoteForm()}
        </Modal>
      </div>
    )
  }
}

export default VoteModal
