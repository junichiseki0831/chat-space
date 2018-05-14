json.content    @message.content
json.id @message.id
json.image      @message.image.url
json.user_name  @message.user.name
json.created_at simple_time(@message.created_at)
