class MessagesController < ApplicationController
  def index
    @messages = Message.order(created_at: 'desc')
  end

  def create
    @message = Message.new message_params
    if @message.save
      ActionCable.server.broadcast("chat", {message: render_message(@message)})
      redirect_to root_path, flash: {success: 'Message sent'}
    else
      redirect_to root_path, flash: {error: 'Error while sending'}
    end
  end

  private
    def render_message(message)
      ApplicationController.render(partial: 'messages/message', locals: {message: message})
    end
    def message_params
      params.require(:message).permit(:body)
    end
end
