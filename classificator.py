r = open('data/reviews.txt','r')
reviews = list(map(lambda x:x[:-1], r.readlines()))
reviews_train = reviews[0:50]
test_reviews = reviews[51:100]
r.close()

l = open('data/labels.txt','r')
labels = list(map(lambda x:x[:-1].upper(), l.readlines()))
labels_train = labels[0:50]
test_labels = labels[51:100]
l.close()

from sklearn.feature_extraction.text import CountVectorizer
# count_vect = CountVectorizer()
# words_in_sents = count_vect.fit(reviews)
# # print(words_in_sents.get_feature_names())
# words_in_sents = count_vect.transform(reviews)
# # print(words_in_sents.shape)

# test_review = ['This is just bad', 'Not bad!', 'great and interesting']
# test_review_ = count_vect.transform(test_review)
# test_review_.toarray()

from sklearn.feature_extraction.text import TfidfTransformer
# tf_transformer = TfidfTransformer()
# words_in_sents_tf = tf_transformer.fit(words_in_sents)
# words_in_sents_tf = tf_transformer.transform(words_in_sents)
# # print(X_train_tf.shape)

from sklearn.naive_bayes import MultinomialNB
# classifier = MultinomialNB().fit(words_in_sents_tf, labels)

from sklearn.pipeline import Pipeline
text_classifier = Pipeline([('count_vect', CountVectorizer()),
                     ('tf_transformer', TfidfTransformer()),
                     ('classifier', MultinomialNB()),
])
text_classifier.fit(reviews_train, labels_train) 

# print(text_classifier.predict(test_review))
# print(test_reviews)
test_prediction = text_classifier.predict(test_reviews)


from sklearn import metrics
# print(test_labels)
print(metrics.classification_report(test_labels, test_prediction))